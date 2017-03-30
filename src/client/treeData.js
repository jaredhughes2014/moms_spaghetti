var treeData = {
	tree: {
		title: "Oregon Trail",
		tree_id: 1,
	  	childNodes: [
			{
				title: "Cross the river",
				tree_id: 2
			},
			{
				title: "Go through the mountains", 
				tree_id: 3,
				childNodes: [
			  		{
			  			title: "Cholera", 
			  			tree_id: 4,
			  			childNodes: [
							{
								title: "Dead",
								tree_id: 5
							}
			  			]
			  		},
				  	{
				  		title: "Freeze to death",
				  		tree_id: 6
				  	}
				]
			}
	  	]
	}
};

module.exports = treeData;