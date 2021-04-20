//When selecting a new radio button, we still want to be able to tab into the
//radio-button group. However, if the radio with the tab-index isn't selected, it
//want be tabbed to. Therefore, we want to always apply the tabindex to the selcted
//button.

//This will create a closure for each group of radio buttons. Each closure will 
//have access to every radio-button in the group, and to the group's tabindex number.
window.addEventListener("load", () => {
	
	const radioGroupsClassName = "radioButtonSelection";
	
	
	const radioGroups = document.getElementsByClassName(radioGroupsClassName);
	
	//Setup event listeners for our radios to call.
	//We also want to run the change first, to make sure the selected
	//radio has the tabindex (this might not be the case, if the user
	//has used the back button to get to this page).
	for(let radioGroupIter = 0, radioGroupLen = radioGroups.length; radioGroupIter < radioGroupLen; radioGroupIter++)
	{
		const radios = radioGroups[radioGroupIter].querySelectorAll('input[type=radio]');
		let groupRadioTabIndex = -1;
		
		//When we find the right tabindex, set the tabindex
		//for the group to that (just leave as -1 if there isn't one).
		//None-selected radios need to have -1.
		const tabIndexSetter = () => {
			
			//By the time this method is ran (in event listener, or intially) the groupRadioTabIndex
			//variable for this radio group will have been set, which is what is being referenced to here.
			
			for(let eRadioIter = 0, eRadioLen = radios.length; eRadioIter < eRadioLen; eRadioIter++)
			{
				radios[eRadioIter].tabIndex = (radios[eRadioIter].checked) ? groupRadioTabIndex : -1;
			}
		}
		
			
		for(let radioIter = 0, radioLen = radios.length; radioIter < radioLen; radioIter++)
		{
			
			if(radios[radioIter].tabIndex !== -1) groupRadioTabIndex = radios[radioIter].tabIndex;
			
			radios[radioIter].addEventListener("change", () => {
				tabIndexSetter();
			});
		}
		
		
		tabIndexSetter(); //Initial run
	}
	
});