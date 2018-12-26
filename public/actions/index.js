// redux actions 

const nodeSelect = (connected, selected) => {
  return {
    type: 'NODE_SELECT',
    connected: connected,
    selected: selected
  };
};

const legendSelect = (pathway) => {
  return {
    type: 'LEGEND_SELECT',
    pathway: pathway
  };
};



export {nodeSelect, legendSelect};
