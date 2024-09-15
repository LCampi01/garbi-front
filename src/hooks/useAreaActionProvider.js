import {
  useState 
} from 'react';

export const useAreaActionStatesProvider = () => {
  const [enabledAddArea, setEnabledAddArea] = useState(true);
  const [enabledEditArea, setEnabledEditArea] = useState(false);
  const [enabledDeleteArea, setEnabledDeleteArea] = useState(false);

  const [isAddingArea, setIsAddingArea] = useState(false);
  const [isEditingArea, setIsEditingArea] = useState(false);

  const enableAddArea = () => {
    setEnabledAddArea(true)
    setEnabledDeleteArea(false);
    setEnabledEditArea(false);
  }
    
  const enableEditArea = () => {
    setEnabledEditArea(true)
    setEnabledAddArea(false)
    setEnabledDeleteArea(true)
  }

  const addingArea = () => {
    setIsAddingArea(true)
    setEnabledAddArea(false)
    setEnabledDeleteArea(false);
    setEnabledEditArea(false);
  }

  const editingArea = () => {
    setIsEditingArea(true);
    setIsAddingArea(false);
    setEnabledEditArea(false);
  }

  const disableEditArea = () =>{
    setEnabledEditArea(false)
    setEnabledAddArea(true)
    setEnabledDeleteArea(false)
  }

  const resetStates = () => {
    setEnabledAddArea(true)
    setEnabledEditArea(false)
    setEnabledDeleteArea(false)
    setIsAddingArea(false)
    setIsEditingArea(false)
  }

  const controlCamera = () => {
    if(isAddingArea){
      enableAddArea();
    } else {
      enableEditArea();
      setIsEditingArea(false);
    }
  }

    
  return {
    areaActionStates: {
      enableAddArea,
      enableEditArea,
      isAddingArea,
      isEditingArea,
      addingArea,
      editingArea,
      enabledAddArea,
      enabledEditArea,
      enabledDeleteArea,
      disableEditArea,
      resetStates,
      controlCamera
    }
  }
}