import { take } from 'redux-saga/effects';

function* mySaga() {
  console.log('Before login');
  yield take('LOGIN');
  console.log('after login');

  console.log('Before logout');
  yield take('LOGOUT');
  console.log('after logout');
}

export default mySaga;
