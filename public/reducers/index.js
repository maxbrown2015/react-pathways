import _ from 'lodash';
import axios from 'axios';


const mainReducer = (state, action) => {
  switch (action.type) {
     case 'NODE_SELECT': {
       console.log(_.assign({}, state, {connected: action.connected, selected: action.selected}))
       return _.assign({}, state, {connected: action.connected, selected: action.selected});

     }
  }
  return state;
};

export {mainReducer};
