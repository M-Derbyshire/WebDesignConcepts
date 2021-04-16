window.addEventListener("load", () => {
	
	const classToRemove = "preFadeInTransform";
	const smallScreenWidthPx = 650; //(Does not have to be the same as Sass variable $smallScreenWidth)
	const fadeInTriggerPosition = 
						(window.innerHeight / 4) * 3; //The vertical position where fade-ins are triggered
	
	
	//Only set up the scroll event listener on larger screens
	if(window.screen.width > smallScreenWidthPx)
	{
		
		const isElementInVerticalPosition = (elem) => {
			const elemBoundaries = elem.getBoundingClientRect();
			return (elemBoundaries.top <= fadeInTriggerPosition);
		};
		
		
		//We only want to check the first element, as they will be in document order, 
		//and then we remove it. (May need to adapt this if using for more complex pages.)
		const checkAndTriggerClassRemoval = (elems) => {
			if(elems[0] && isElementInVerticalPosition(elems[0]))
			{
				elems[0].classList.remove(classToRemove);
				elems.shift();
			}
		};
		
		
		const elemsWithClass = Array.from(document.getElementsByClassName(classToRemove));
		
		
		if(elemsWithClass.length > 0)
		{
			//We want to check the elements before the first scroll, in case they're already 
			//in position.
			
			//The check/remove func only tests the first element, so we want 
			//to pass it in multiple times.
			for(let i = 0, len = elemsWithClass.length; i < len; i++)
			{
				checkAndTriggerClassRemoval(elemsWithClass);
				
				if(len > elemsWithClass.length) //If an element has been removed
				{
					i--;
					len = elemsWithClass.length;
				}
			}
			
			window.addEventListener("scroll", () => {
				checkAndTriggerClassRemoval(elemsWithClass);
			});
		}
	}
	
});