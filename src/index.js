import { createStore } from 'redux';
console.log('Starting banking app for multiple accounts');

//Creating the default state:
//Since this is an object, we can add more accounts to it later, if we wanted
const defaultState = {
  checking: 100,
  savings: 100
};

// Creating the Action functions:
// First create Action Constants to avoid spelling errors down the line:
const ACTION_DEPOSIT = 'deposit';
const ACTION_WITHDRAWAL = 'withdrawal';
const ACTION_CREATEACCOUNT = 'createAccount';

function createDeposit(account, amount) {
  return {
    type: ACTION_DEPOSIT,
    payload:  {
      //shorthand property naes allow us to omit the : when the key name and value name are the same word!
      account, 
      amount
    }
  }
};

function createWithdrawal(account, amount) {
  return {
    type: ACTION_WITHDRAWAL,
    payload: {
      account, 
      amount
    }
  }
};

function createAccount(account, amount) {
  return {
    type: ACTION_CREATEACCOUNT,
    payload: {
      account, 
      amount
    }
  }
};

//Now, we need to write the accounts Reducer method:
//This reducer expects to receive the state(uses defaultState if nothing is passed) and an action. By default, it will just return state.
//For each case, we need to make a copy of the state, overwrite the ballance, and return a modified copy. 
function accounts(state = defaultState, action) {
  switch(action.type) {
    case ACTION_DEPOSIT:
      console.log(state[action.payload.account]);
      return {
        // The line below uses 'object spread' syntax to copy key/value pairs from the state
        ...state,
        [action.payload.account]: state[action.payload.account] + action.payload.amount
      }
    case ACTION_CREATEACCOUNT:
      return {
        ...state,
        [action.payload.account]: action.payload.amount
      }
    case ACTION_WITHDRAWAL:
      return {
        ...state,
        [action.payload.account]: state[action.payload.account] - action.payload.amount
      }
    default: 
      return state;
  }
}

const store = createStore(accounts);
store.subscribe(() => {
  console.log('The state has updated!');
  const state = store.getState();
  console.log(state)
});

//added just so we can test the app in the dev tools 
window.store = store;
window.createDeposit = createDeposit;
window.createWithdrawal = createWithdrawal;
window.createAccount = createAccount;