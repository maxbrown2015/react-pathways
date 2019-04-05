const changeCourse = (index, newCourse) => {
  return {
    type: 'CHANGE_COURSE',
    index: index,
    newCourse: newCourse
  };
};

const deleteCourse = (index) => {
  return {
    type: 'DELETE_COURSE',
    index: index
  };
};

const addCourse = (newCourse) => {
  return {
    type: 'ADD_COURSE',
    newCourse: newCourse
  };
};

const changePathway = (index, pathway) => {
  return {
    type: 'CHANGE_PATHWAY',
    index: index,
    pathway: pathway
  };
};

const undoChanges = () => {
  return {
    type: 'UNDO_CHANGES'
  };
};

const exportData = () => {
  return {
    type: 'EXPORT'
  };
};

const cacheState = () => {
  return {
    type: 'CACHE'
  };
};



export {changeCourse, deleteCourse, addCourse, changePathway, undoChanges, exportData, cacheState};
