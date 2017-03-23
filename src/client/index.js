import {render} from 'react-dom';
import React from 'react';
import Tree from './tree';
 
var data = {
  	title: "Oregon Trail",
  	childNodes: [
		{
			title: "Cross the river"
		},
		{
			title: "Go through the mountains", 
			childNodes: [
		  		{
		  			title: "Cholera", 
		  			childNodes: [
						{
							title: "Dead"
						}
		  			]
		  		},
			  	{
			  		title: "Freeze to death"
			  	}
			]
		}
  	]
};

/**
 * Let there be Tree
 */
render(
  <Tree node={data}/>,
  document.getElementById('app')
);