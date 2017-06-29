     var svg = dimple.newSvg("#row", 590, 400);
        var dataArray = [];
        
    d3.csv("data/Log.csv", function (data) {
      data.forEach(function(e) {
            e.count = 1;
            e.Date1 = (new Date(e.TimeStamp).getMonth() + 1) + '/' + (new Date(e.TimeStamp).getDate()) + '/' +  new Date(e.TimeStamp).getFullYear();
        })
        dataArray = data;
      var myChart = new dimple.chart(svg, data);
      myChart.setBounds(90, 30, 470, 330)
      myChart.addMeasureAxis("y", "count");
      var y = myChart.addCategoryAxis("x", ["Medium", "Date1"]);
      y.addGroupOrderRule("Date");
      var s = myChart.addSeries("Medium", dimple.plot.area);
      s.lineWeight = 1;
      s.barGap = 0.05;
      myChart.draw();
        
        //Second Chart
         var svg1 = dimple.newSvg("#row1", 590, 400);
        dataArrayNew = dimple.filterData(dataArray, "Type", ["Tips","Guide","Links","Template","List"]);
        
      var myChart2 = new dimple.chart(svg1, dataArrayNew);
      myChart2.setBounds(75, 20, 460, 360)
      
        myChart2.addMeasureAxis("p", "count");
      var ring = myChart2.addSeries("Type", dimple.plot.pie);
      ring.innerRadius = "50%";
        
      myChart2.addLegend(500, 20, 90, 300, "left");
        
      myChart2.draw();
        
    d3.select('#Date')
			.on("change", function () {
        var filterValues = [];
        var date = new Date(document.getElementById("Date").value);
        var dateModified = (date.getMonth() + 1) + '/' + (date.getDate()+1) + '/' +  date.getFullYear();
        filterValues.push(dateModified);
        
        myChart2.data = dimple.filterData(dataArrayNew, "Date1", filterValues);
            
        
        myChart2.draw(800);  
          });
        
        //Third Chart
         var svg2 = dimple.newSvg("#row2", 590, 400);
        var data_new = dataArray;
      var myChart3 = new dimple.chart(svg2, data_new);
        
        
      myChart3.setBounds(90, 35, 480, 325)
      myChart3.addMeasureAxis("x", "count");
      myChart3.addCategoryAxis("y", "Date1");
      myChart3.addSeries("Medium", dimple.plot.bubble);
      myChart3.addLegend(240, 10, 330, 20, "right");
      myChart3.draw();
        d3.select('#drop')
        .on("change", function() {
            var filters = [];
            var value = document.getElementById("drop").value;
            if(value != "All") {
                filters.push(value);
                if(value == "Professional")
                    {filters.push("Professional ");}
                myChart3.data = dimple.filterData(data_new, "SCAP", filters);
                myChart3.draw(1000);
            }
             else {
                 myChart3.data_new = dataArray;
                 myChart3.draw(1000);
             }
                                            
        });
        
        //Fourth Chart
         var svg3 = dimple.newSvg("#row3", 590, 400);
    
       var data_new2 = dataArray;
      var myChart4 = new dimple.chart(svg3, data_new2);
        filterV = ["Guide","Tips","Links","List","Template"];
        
      myChart4.setBounds(60, 30, 510, 305);
      var x = myChart4.addCategoryAxis("x", ["Type", "SCAP"]);
      myChart4.addMeasureAxis("y", "count");
      myChart4.addSeries("SCAP", dimple.plot.bar);
     myChart4.addLegend(65, 10, 510, 20, "right");
        myChart4.data = dimple.filterData(data_new2, "Type", filterV);
      myChart4.draw();
        
        //Fifth Chart
        var svg5 = dimple.newSvg("#row5", 590, 400);
            
       var data_new3 = dataArray;
        
      // Create and Position a Chart
      var myChart5 = new dimple.chart(svg5, data_new3);
      myChart5.setBounds(60, 30, 500, 300);
      var x = myChart5.addCategoryAxis("x", "Date1")
      myChart5.addMeasureAxis("y", "count");

      // Order the x axis by date
      x.addOrderRule("Date");

      // Min price will be green, middle price yellow and max red
      myChart5.addColorAxis("count", ["Red", "yellow","green"]);

      // Add a thick line with markers
      var lines = myChart5.addSeries("Resources", dimple.plot.line);
      lines.lineWeight = 5;
      lines.lineMarkers = true;

      // Draw the chart
      myChart5.draw();
    
    });
        
  