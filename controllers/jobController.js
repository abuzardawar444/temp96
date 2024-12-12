import mongoose from 'mongoose';
import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes';
import day from 'dayjs';

export const getAllJobs = async (req,res) => {
    const {search, jobStatus, jobType, sort} = req.query;
    const queryObject = {
        createdBy: req.user.userId
    }
    if(search){
        queryObject.$or = [
            {position: {$regex: search, $options: 'i'}},
            {company: {$regex: search, $options: 'i'}},
        ]
    }
    if(jobStatus && jobStatus!= 'all'){
        queryObject.jobStatus = jobStatus;
    }
    if(jobType && jobType!= 'all'){
        queryObject.jobType = jobType;
    }

    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position',
    }

    const sortKey = sortOptions[sort] || sortOptions.newest;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit;
    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs/limit);
    res.status(StatusCodes.OK).json({numOfPages, currentPage:page, totalJobs, jobs});
}

export const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}

export const getJob = async (req,res) => {
    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({job});
}

export const updateJob = async (req,res) => {
    const {company , position} = req.body;
    if(!company || !position){
        return res.status(400).json({message: "Please provide company and position"});
    }
    const job = await Job.findByIdAndUpdate(req.params.id , req.body , {new:true});
    res.status(StatusCodes.OK).json({message:"Job Modified",job});
}

export const deleteJob = async (req,res) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({message:"Job Deleted successfully",job});
}

export const showStats = async (req, res) => {
    let getStats = await Job.aggregate([
        {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{_id:'$jobStatus',count:{$sum: 1}}},
    ])
    getStats = getStats.reduce((acc, curr) => {
        const{_id:title,count} = curr;
        acc[title] = count;
        return acc;
    },{})
    let allStats = {
        "Pending": getStats.Pending || 0,
        "Interview": getStats.Interview || 0,
        "Declined": getStats.Declined || 0,
    }

    let monthlyApplications = await Job.aggregate([
        {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {
            _id:{year:{$year:'$createdAt'} , month:{$month:'$createdAt'}},
            count:{$sum:1}
        }},
        {$sort:{'_id.year':-1, '_id.month':-1}},
        {$limit: 6}
    ]);
    monthlyApplications = monthlyApplications.map((application) => {
        const {_id:{year,month}, count} = application;
        const date = day().month(month-1).year(year).format('MMM YY');
        return {date, count}
    }).reverse();
    res.status(StatusCodes.OK).send({allStats, monthlyApplications});
}