//run this after animation is done
function init() {
  
	$("#splash-logo").remove()
	$("#title-image").removeClass("hidden")

	var width = 1280;
	var height = 720;

	var defaultWidth = 1280;
	var defaultHeight = 720;

	var app = new PIXI.Application({width: width, height: height});
	document.body.appendChild(app.view);
	app.view.style.animation = "fadein 3s"
  
	var boundsPadding = 50;
  
	//food items should be within this box
	var bounds = new PIXI.Rectangle(-boundsPadding, -boundsPadding, app.screen.width + boundsPadding * 2, app.screen.height + boundsPadding * 2);

	//handle window resizing
	function resize() {
		var w = window.innerWidth;
		var h = window.innerHeight;

		app.stage.scale.x = w / width;
		app.stage.scale.y = h / height;

		app.renderer.resize(w, h);

		width = w;
		height = h;
		bounds = new PIXI.Rectangle(-boundsPadding, -boundsPadding, app.screen.width + boundsPadding * 2, app.screen.height + boundsPadding * 2)
	}

	//addEventListener and perform intial sizing
	window.addEventListener("resize", resize);
	resize();

	var foodTypes = [{ name: "", img: "Assets/images/food4.png" }, { name: "", img: "Assets/images/food6.png" }, { name: "", img: "Assets/images/food5.png" }, { name: "", img: "Assets/images/food2.png" }, { name: "", img: "Assets/images/food1.png" }, { name: "", img: "Assets/images/food3.png" }]

	//this array will hold the Sprite of our food items
	var foodItems = [];

	//event handlers for the Sprite
	function onButtonDown() {
		showRestaurant(foodItems.indexOf(this))
	}

	function onButtonOver() {
		this.speed = 0
	}

	function onButtonOut() {
		this.speed = 2 + Math.random() * 2;
	}

	//for every object in foodtype, we create a srite with randome initial settings
	foodTypes.forEach((food, index) => {
		var foodSprite = PIXI.Sprite.fromImage(food.img)
		foodSprite.anchor.set(0.5)
		foodSprite.x = Math.random() * app.screen.width;
		foodSprite.y = Math.random() * app.screen.height;
		foodSprite.scale.set(getScale(), getScale())

		foodSprite.direction = Math.random() * Math.PI * 2;

		foodSprite.turningSpeed = Math.random() - 0.8;

		foodSprite.speed = 2 + Math.random() * 2;

		foodSprite.interactive = true;
		foodSprite
		// Mouse & touch events are normalized into
		// the pointer* events for handling different
		// button events.
		.on('pointerdown', onButtonDown)
		.on('pointerover', onButtonOver)
		.on('pointerout', onButtonOut);

		foodItems.push(foodSprite);
		app.stage.addChild(foodSprite);
	})

	//getting scale factors for Sprite
	function getScale() {
		return Math.min(Math.min(window.innerHeight / defaultHeight, window.innerWidth / defaultWidth), 1)
	}

	// updating the position for Sprite
	app.ticker.add(function () {

		foodItems.forEach((sprite) => {
			sprite.direction += sprite.turningSpeed * 0.01;
			sprite.x += Math.sin(sprite.direction) * sprite.speed;
			sprite.y += Math.cos(sprite.direction) * sprite.speed;
			sprite.rotation = -sprite.direction - Math.PI / 2;
			sprite.scale.set(getScale(), getScale())

			// wrap the dudes by testing their bounds...
			if (sprite.x < bounds.x) {
				sprite.x += bounds.width;
			}
			else if (sprite.x > bounds.x + bounds.width) {
				sprite.x -= bounds.width;
			}

			if (sprite.y < bounds.y) {
				sprite.y += bounds.height;
			}
			else if (sprite.y > bounds.y + bounds.height) {
				sprite.y -= bounds.height;
			}
		})
	});

	var data = [
		[
			{ imgSrc: "Assets/images/poulet.jpg", name: "Poulet Bleu", desc: "Well known chef Rick DeShantz and business partner Tolga Sevdik have created a romantic haven lit by candles and featuring classic french decor. The open kitchen, featuring a blue French Hestan range, warms the cafe and is the center of the action. The menu offers classic terrines, tasty mussels, and classic steak frites.", address: "3519 Butler StPittsburgh, PA 15201", phone: "(412) 325-3435", link: "https://www.pouletbleupgh.com/" },
			{ imgSrc: "Assets/images/acorn.jpg", name: "Acorn", desc: "Chicago’s Markethouse, Scott Walton, has come to Pittsburgh to open Acorn. The bar is a definite feature of this cozy neighborhood restaurant and the New American dining experience features a Nordic menu, with elevated classics like barbecue flavored smoked beets, or sausage plated with celery and chives.", address: "5528 Walnut St Pittsburgh, PA 15232", phone: "(412) 530-5950", link: "http://acornpgh.com/" },
			{ imgSrc: "Assets/images/whale.jpg", name: "Or, The Whale", desc: "This new seafood and chop house resides in the Distrikt Hotel Pittsburgh.  Its brunch menu is available seven days a week, a rarity, here in Pittsburg, and offers  monkey bread (sweetened with brown sugar, black cardamom, and orange), and savory corn waffles, piled high with bacon, sausage, and a fried egg. Pair one of these brunch delicacies with their fabulous cocktails and you are all set to go.", address: "Salvation Army building, 463 Boulevard of the Allies, Pittsburgh, PA 15219", phone: "(412) 632-0002", link: "https://www.orthewhalepgh.com/dinner/" }

		], [
			{ imgSrc: "Assets/images/driftwood.jpg", name: "Driftwood Oven", desc: "Neil Blazin and Justin Vetter are settling down.  Their woodfired oven has found a new home in Lawrenceville, and is now a gas-deck oven. With their new digs, they have expanded their menu to include naturally leavened, 16-inch pizzas, focaccia sandwiches, seasonal sides, and desserts. ", address: "3615 Butler St Pittsburgh, PA 15201", phone: "(412) 251-0253", link: "https://www.driftwoodoven.com/" },
			{ imgSrc: "Assets/images/taglio.png", name: "Pizza Taglio", desc: "Located next to The Livermore on South Highland, Pizza Taglio has high ceilings, large windows and warm color scheme; It has a classy yet friendly welcoming vibes. Pizza Taglio sell by slices and the menu ranges from the classic Margherita to the inventive Greenpointer, which is topped with spicy soppressata and hot honey.", address: "126 S Highland Ave Pittsburgh, PA 15206", phone: "(412) 404-7410", link: "http://tagliopgh.com/" },
			{ imgSrc: "Assets/images/piccolo.jpeg", name: "Piccolo Forno", desc: "Small in seating but big in taste, Piccolo Forno is known for their pizzas and rich pastas. Flames from the wood-burning oven warm the brick-walled dining room provides a cozy atmosphere. Twelve pastas are made with seasonal ingredients, including options like beet bucatini with salmon.", address: "3801 Butler St Pittsburgh, PA 15201", phone: "(412) 622-0111", link: "http://www.piccolo-forno.com/#rustic-italian-faire" }
		], [
			{ imgSrc: "Assets/images/merchant.png", name: "Merchant Oyster Co.", desc: "Merchant Oyster Co hopes to make oysters the newest splash in Lawreceville. The menu will consist of west coast and east coast oysters along with chowders and hamburgers and an authentic Maine lobster roll. There is also a dessert menu that contains a whoopie pie and a New England Apple Cake.The downstairs has wooden bar with fantastic cocktail menu.", address: "4129 Butler St Pittsburgh, PA 15201", phone: "(412) 932-2553", link: "https://www.merchantpgh.com/" },
			{ imgSrc: "Assets/images/union.jpg", name: "Union Standard", desc: "Located downtown, in one of the Pittsburgh's most iconic buildings, Union Standard is spacious and relaxed.Drawing inspiration from the American Northeast, Mid-Atlantic and Appalachian regions, this Downtown American from chef Derek Stevens presents an imaginative seasonal menu highlighting locally sourced meats supplemented by a raw bar and cocktails.", address: "524 William Penn Pl, Pittsburgh, PA 15219", phone: "(412) 281-0738", link: "http://www.unionstandardpgh.com/" },
			{ imgSrc: "Assets/images/muddy.jpg", name: "Muddy Waters Oyster Bar", desc: "Muddy Waters Oyster Bar, near East Liberty's dining epicenter at the corner of Centre and South Highland avenues, combines a connoisseur's approach to oysters with Southern, primarily Cajun, cuisine. With New Orleans as its guiding light, it serves up Cajun small and large plates from plentiful raw bar stocked with East Coast and West Coast oysters.", address: "130 S Highland Ave Pittsburgh, PA 15206", phone: "(412) 361-0555", link: "http://muddywaterspgh.com/" }
		], [
			{ imgSrc: "Assets/images/twisted.jpg", name: "The Twisted Frenchman", desc: "The street level is Bar Frenchman, a casual French brasserie and cocktail bar. Upstairs from his more casual Bar Frenchman, this tasting-menu spot offers menus with dishes like baby aubergine, beets six ways, salmon, foie gras, smoked duck, and 50-day dry-aged beef.", address: "5925 Baum Blvd Pittsburgh, PA 15206", phone: "(412) 665-2880", link: "https://www.thetwistedfrenchman.com/" },
			{ imgSrc: "Assets/images/f1.jpg", name: "Fl. 2 at the Fairmont Hotel Pittsburgh", desc: "Chef Julio Peraza has landed in Downtown Pittsburgh, following stints in Florida and in Dallas at Madrina (now closed), which in 2015 was named best new restaurant by D Magazine. The menu includes fresh and locally-sourced ingredients paired with items like chicken. ", address: "510 Market St Pittsburgh, PA 15222", phone: "(412) 773-8848", link: "http://www.fl2pgh.com/" }
		], [
			{ imgSrc: "Assets/images/vandal.jpg", name: "The Vandal", desc: "Ambitious spins on Eastern European small plates such as smoked trout with crispy potato latke, plus hearty breakfast and brunch bites like biscuit sandwiches are the draw at this bright, modern Lawrenceville cafe outfitted with white walls, a back patio and lush greenery.", address: "4306 Butler St, Pittsburgh, PA 15201", phone: "(412) 251-0465", link: "http://www.thevandalpgh.com/" },
			{ imgSrc: "Assets/images/bitter.jpg", name: "Bitter Ends Garden and Luncheonette", desc: "Bitter Ends Garden has a classic lunch counter in a cozy space with just a few seats and a couple tables. Counter service is warm and friendly, and everything feels homey. The menu is a simple list of sandwiches, soups and pastries. Farm-fresh produce is featured heavily.", address: "4613 Liberty Ave Pittsburgh, PA 15224", phone: "(412) 450-0229", link: "https://www.tillthebitterends.com/" },
			{ imgSrc: "Assets/images/bluebird.jpg", name: "Bluebird Kitchen", desc: "Bluebird is more than sandwiches, but the sandwiches at this breakfast and lunch spot are beyond the beyond. The Croque Monsieur, a ham sandwich on brioche covered in special sauce, takes your mouth to France, without the airfare. The House Roast Beef on ciabatta is also on point and worth the inevitable lunch line.", address: " 221 Forbes Ave, Pittsburgh, PA 15222", phone: "(412) 642-4414", link: "http://www.bluebirdkitchen.com/" }
		], [
			{ imgSrc: "Assets/images/ki.jpg", name: "Ki Ramen", desc: "A reasonably priced neighborhood go-to opened in the summer by Lawrenceville veterans Domenic Branduzzi and Roger Li, who overhauled this trilevel space with murals framed by soft lighting and bamboo accents. Serving lunch and dinner, the spot features house-made noodles as the star of curry, shio, miso, and shoyu ramen with add-ons like the black-garlic butter bomb.", address: "4401 Butler St. Pittsburgh, PA 15201", phone: "(412) 586-4796", link: "http://kiramenpgh.com/" },
			{ imgSrc: "Assets/images/umami.jpg", name: "Umami", desc: "This Japanese-style gastropub emphasizes robatayaki (meat and vegetables skewers cooked on a charcoal grill) and fresh sushi options. Umami's late-night hours make it a strong contender for late dinners or post-drinking bites. Unsurprisingly, the drink program is a strong draw, with plenty of sake.", address: "202 38th St. Pittsburgh, PA 15201", phone: "(412) 224-2354", link: "http://umamipgh.com/" },
			{ imgSrc: "Assets/images/soba.jpg", name: "Soba", desc: "Soba is a Pan-Asian restaurant that consistently rates as one of Pittsburgh's finest, with accolades ranging from Best New Restaurant (In Pittsburgh) & Best Restaurant (Pittsburgh Magazine). The menu changes daily, allowing the chef to create signature selections with an Asian influence. The large selection of tempting appetizers are perfect for sharing among your group.", address: "5847 Ellsworth Ave Pittsburgh, PA 15232", phone: "(412) 362-5656", link: "http://sobapa.com/" }
		]
	]
  
	//show the modal, then create the carousel items
	function showRestaurant(i) {
		$("#restaurantModal").modal()
		var restaurantList = data[i]
		$("#restaurant-carousel-indicators").empty()
		$("#restaurant-carousel-items").empty()
		restaurantList.forEach((restaurant, index) => {
			var item = $("<div class=\"item\"></div>")
			if (index == 0) {
				item.addClass("active")
			}
			var img = $("<img>")
			img.attr("src", restaurant.imgSrc)
			item.append(img)
			var caption = $("<div></div>")
			item.append(caption)

			var title = $("<h3>" + restaurant.name + "</h3>")
			caption.append(title)
			var desc = $("<p>" + restaurant.desc + "</p>")
			caption.append(desc)
			var address = $("<p>" + restaurant.address + "</p>")
			caption.append(address)
			var phone = $("<p>" + restaurant.phone + "</p>")
			caption.append(phone)
			var link = $("<a>" + restaurant.link + "</a>")
			link.attr("href", restaurant.link)
			caption.append(link)

			$("#restaurant-carousel-items").append(item)

			var indicator = $("<li data-target=\"#myCarousel\" data-slide-to=\"" + index + "\"></li>")
			if (index == 0) {
				indicator.addClass("active")
			}
			$("#restaurant-carousel-indicators").append(indicator)
		})
	}
}

//run the init funtion after 5secs
setTimeout(init, 5000)