// redux actions 

const networkSelect = (selected) => {
  return {
    type: 'NETWORK_SELECT',
    selected: selected
  };
};

const catalogSelect = (selected) => {
  return {
    type: 'CATALOG_SELECT',
    selected: selected
  };
};


const buildCatalog = (connected) => {
  return {
    type: 'BUILD_CATALOG',
    connected: connected
  };
}

const legendSelect = (pathway) => {
  return {
    type: 'LEGEND_SELECT',
    pathway: pathway
  };
};

const setActivePathways = (activePathways) => {
  return {
    type: 'SET_ACTIVE_PATHWAYS',
    activePathways: activePathways
  }
}

const resetSelectionOptions = () => {
  return {
    type: 'RESET_SELECTION_OPTIONS',
  }
}




export {networkSelect, catalogSelect, buildCatalog, legendSelect, setActivePathways, resetSelectionOptions};
