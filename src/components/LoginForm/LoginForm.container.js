import { connect } from 'react-redux';
import { authOperations } from '../../redux/auth';
import LoginForm from './LoginForm';

const mapDispatchToProps = {
  onLoginUser: authOperations.loginUser,
};

export default connect(null, mapDispatchToProps)(LoginForm);
