// initialize the table as an empty variable
let table;
let parks_table;

// preload happens only once, and is required to happen before setup
// if we load data here, it ensures we don't draw until data is ready!
function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable('./rollercoaster_clean.csv', 'csv', 'header');
  parks_table = loadTable('./park_speed.csv', 'csv', 'header');
}

// happens only once, after preload() triggers
function setup() {
  createCanvas(1000, 1000);
  background(243, 246, 247); 
  // console out the table and look for the columns we are interested in
  // using the developer tools of the browser (Command+Option+i on a Mac or "Inspect" on right click)
  console.log(table)
  console.log(parks_table)
}

// all drawing happens here, but only once because of the noLoop() at the end
function draw() { 
  // we can access how many rows and columns using getColumnCount() or getRowCount() method on table
  console.log('Num cols: '+table.getColumnCount())
  console.log('Num rows: '+ table.getRowCount())
  
  console.log('Num cols: '+parks_table.getColumnCount())
  console.log('Num rows: '+ parks_table.getRowCount())
  
  // loading in font family for canvas
  textFont('Lato');

  // loop through the table for every row in the CSV using getRowCount()
  
  for (let row = 0; row < table.getRowCount(); row++) {
    // getNum() method takes two arguments: first is the row index, and second is the column index
    // if we pass in 5, then we are grabbing data for this row from column number 6
    // you can change the number to access different columns in the CSV
    
    // getting the column for speed
    let value = table.getNum(row,4)
    
    // map the speed of the rollercoasters onto a range of pixels using the min/max of the speed
    let x = map(value,0,240,0,width)
    
    // setting the height of my triangle line chart
    let y = 50;
       
    // drawing a triangle for each rollercoaster, and assigning color to the roller coasters for each level of thrill-seekers based on speed
    stroke(250)
    if (value > 200){

    fill(193, 41, 46)
 } else if(value > 150 && value < 200){
     fill(255, 101, 66,127)
   }
    else if(value < 75 && value > 60){
     fill(119, 159, 161,127)
   } 
    else if(value < 20){
     fill(209, 174, 213,127)
   } 
    else {

    fill(224, 203, 168,127)
 }
    triangle(x,y,x+30,y+30,x+50,y)
  }
  // creating an x axis label for my speed triangle chart
  fill(0)
  triangle(200,96,200,104,206,100)
  text('Speed (km/h)', 20,115)
  stroke(0)
  line(20,100,200,100)
  // labels for the parks i'm pointing out on the speed triangle chart
  /////pointer lines
  stroke(255, 101, 66)
  line(700,100,700,80)
  stroke(119, 159, 161)
  line(300,40,300,50)
  stroke(209, 174, 213)
  line(60,40,60,50)
  //////text labels
  noStroke()
  fill(255, 101, 66)
  text('Superman: Escape from Krypton (Six Flags Magic Mountain, CA)', 650,100,150,200)
  fill(119, 159, 161)
  text("Steamin' Demon (Adventure Island, FL)", 200, 10,150,200)
  fill(209, 174, 213)
  text("Tuff-Tuff Tåget (Gröna Lund, Sweden)", 6,10,150,200)
 
  
  // scatterplot showing the relationship between speed and height - height = the x value, speed = the y value
  stroke(250)
  for (let row = 0; row < table.getRowCount(); row++) {
    let coaster_height = table.getNum(row,5)
    let speed = table.getNum(row,4)
    
    let x = map(coaster_height, 0, 139, 0, width)
    
    let y = map(speed, 0, 240,300+(height/2),0)
    // assigning the colors to each of the thrill-seeking levels in the scatter plot based on height 
    if (speed > 200){

    fill(193, 41, 46)
   } 
    else {
    fill(224, 203, 168,127)
   }
    if(coaster_height > 100){
     fill(255, 101, 66,127)
   } else if(coaster_height > 20 && coaster_height < 40){
     fill(119, 159, 161,127)
   } else if (coaster_height < 10) {
     fill(209, 174, 213,127)
   }
    rect(x+150,y,10)
  }
  
  // labels for parks i'm pointing out on the scatter plot
  ///// pointer lines
  stroke(255, 101, 66)
  line(840,275, 975,273)
  
  stroke(119, 159, 161)
  line(455,620,420,550)
  
  stroke(209, 174, 213)
  line(245,760,220,700)
  
  ///// text labels
 noStroke()
  fill(255, 101, 66)
  text('Kingda Ka (Six Flags Great Adventure, NJ)', 700,270,150,200)
  fill(119, 159, 161)
  text('Shaman (Gardaland, Italy)', 450, 625, 150, 200)
  fill(209, 174, 213)
  text('Backyardigans: Mission to Mars (Movie Park Germany)', 250,760,150,200)
  

  
  
  // creating the text labels referring to Ferrari World (all the same red color)
  fill(193, 41, 46)
  text('Formula Rossa (Ferrari World, UAE). Not the tallest, but by far the fastest!',540,5,175,200);
  text('Formula Rossa (Ferrari World) is the fastest coaster, reaching speeds of up to 240 km/h.', 850, 85, 150,300);
  text('Ferrari World in Abu Dhabi has the fastest rollercoasters in the world. The average coaster in Ferrari World runs up to 185 km/h.', 780, 400, 200,200)
  
   // drawing a pointer line to the Formula Rossa text box for lollipop chart
  stroke(193, 41, 46)
  line(900, 390, 900,300)
  line(900,300,995,300)
  
  // lollipop chart units box
   //////text 
  noStroke()
  fill(0)
  text("1 bar = 1 park",580,730,200,200);
  ///// pointer line
  stroke(0)
  noFill()
  line(615,790,615,745)
  rect(575,725,80,20)
  
  // parks v. speed - lollipop line chart 
  ///// loading in a different dataframe parks_table where the data is grouped by parks and the value is the mean speed
  
  fill(37, 110, 255)
  ///// creating a lollipop line chart where the length of each line corresponds to the mean speed for each park (ie. the longer the line, the higher the average speed)
  ///// color coding based on thrill-seeking level
  for (let row=0; row<parks_table.getRowCount(); row++) {
    let park_number = parks_table.getNum(row,1);
    let avg_speed = parks_table.getNum(row,3);
    
    let y = map(avg_speed, 0, 185,0, height);
    
    let x = map(park_number, 0, 409, 0, width);
    if (avg_speed > 180){
    stroke(193, 41, 46)
   } else if(avg_speed > 100 && avg_speed <180){
     stroke(255, 101, 66)
   }  
    else if(avg_speed >60 && avg_speed < 70){
     stroke(119, 159, 161)
   } else if(avg_speed < 50) {
     stroke(209, 174, 213)
   }
    else {
    stroke(224, 203, 168)
   }
    strokeWeight(2)
    line(1000-x,1000,1000-x,1200-y)
  }
  // labels for the parks i'm pointing out on the lollipop chart (except Formula Rossa, which I did above)
  ////// lines
  stroke(255, 101, 66)
  line(940,625,970,620)
  
  stroke(119, 159, 161)
  line(420,825,423,845)
  
  stroke(209, 174, 213)
  line(75,930,80,983)
  ///// text labels
  noStroke()
  fill(255, 101, 66)
  text('Janfusun Fancyworld (Taiwan)', 825, 625,150,200)
  
  fill(119, 159, 161)
  text('Freizeitpark Familienland (Austria)',370,800,150,200)
  
  fill(209, 174, 213)
  text('Julianatoren Apeldoorn (Netherlands)', 20, 900, 150,200)
  
  // creating the bigger text labels for each plot
  ///// triangle speed plot
  fill(0)
  textSize(18)
  text('The average rollercoaster speed is 70 km/h.', 20, 130, 350, 200);
  
   ////// height v. speed scatter plot
  let s = "The taller the rollercoaster, the faster it is. There is a significant positive correlation between speed and height (R=0.35, p < .05).";
  fill(0);
  text(s, 20, 325, 350, 500);
  
  //////// lollipop line chart
  let p = 'Daredevils may opt for parks like Ferrari World that offer more high-speed options, but there is no shortage of parks that offer fun at a slower pace.';
  text(p, 625,515,350,300)
  // this function prevents p5 from looping over and over, since we don't need animation
  noLoop()
}
