import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    width: 50%;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
  .google{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .google-icon{
    width:25px;
    height:25px;
    padding-right: 5px;
  }
  .google-icon path:nth-child(1) {
    fill: #4285F4;
  }
  .google-icon path:nth-child(2) {
    fill: #34A853;
  }
  .google-icon path:nth-child(3) {
    fill: #FBBC05;
  }
  .google-icon path:nth-child(4) {
    fill: #EA4335;
  }
`;
export default Wrapper;
