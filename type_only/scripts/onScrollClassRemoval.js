window.addEventListener("load", () => {
	
	const classToRemove = "preFadeInTransform";
	const smallScreenWidthPx = 650; //(Does not have to be the same as Sass variable $smallScreenWidth)
	
	
	//Only set up the scroll event listener on larger screens
	if(window.screen.width > smallScreenWidthPx)
	{
		
		const isElementInVerticalPosition = (elem) => {
			const elemBoundaries = elem.getBoundingClientRect();
			return (elemBoundaries.top <= (window.innerHeight / 4) * 3);
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
		
		//We want to check the first element before the first scroll, in case it's already 
		//in position.
		if(elemsWithClass.length > 0)
		{
			checkAndTriggerClassRemoval(elemsWithClass);
			
			window.addEventListener("scroll", () => {
				checkAndTriggerClassRemoval(elemsWithClass);
			});
		}
	}
	
});