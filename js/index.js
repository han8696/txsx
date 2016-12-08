var app=angular.module('reminder',[]);
//angular中     $scope.$watch()  $scope.$digest()
//controller内部的函数调用或赋值时都隐式调用$scope.$digest()
/*自定义指令时，watch会先在页面中过一遍，watch到数据会与digest进行比较，不一样时会进行重绘，发生在controller
    内部可以直接调用$scope.$digest()，不在时用$scope.$apply调用$scope.$digest()
*/
  app.directive('xx',[function(){
  	  return{
  	  	restrict:'A',
  	  	transclude:true,
  	  	replace:true,
  	  	template:'<div class="bottom"><div ng-transclude></div></ul>',
  	  	link:function($secope,el){
  	  		var move=$(el).find('.move');
  	  		var finish=$(el).find('.finish')
	  		finish.on('click',function(){
	  			$(".xqbox").css({"display":"none"});
  	  	   })
  	    }
  	  }
   }]);	  	
  app.directive('ngbottom',[function(){
  	  return{
  	  	restrict:'A',
  	  	transclude:true,
  	  	replace:true,
  	  	template:'<div class="bottom-open"><div ng-transclude></div></ul>',
  	  	link:function($secope,el){
  	  		var flag=true;
  	  		$(el).on('click',function(){
  	  			if(flag){
  	  				$(el).css({"background-position":"-96px -497px"});
	  			    $(".centerbox-wancheng").hide()
  	  			}else{
  	  				$(el).css({"background-position":"-23px -526px"});
	  			    $(".centerbox-wancheng").show()
  	  			}
	  			flag=!flag;
  	  		})
  	  	}
  	  }
  }])
  app.directive('unfinish',[function(){
  	  return{
  	  	restrict:'A',
  	  	transclude:true,
  	  	replace:true,
  	  	template:'<div class="unfinished"><div ng-transclude></div></ul>',
  	  	link:function($secope,el){
  	  		
  	  	}
  	  }
  }])
    app.directive('ngN',[function(){
    	return{
    		restrict:'A',
    		transclude:true,
    		replace:true,
    		template:'<ul class="selection-circle"><div ng-transclude></div></ul>',
    		link:function($scope,el){
    			$(el).on('click','li',function(){
    				var index=$(this).index();
    				console.log(index)
        			$(".selection-circle li").css({'background-position-y':33}).eq(index).addClass('biaoshi').css({'background-position-y':-index*33})
        			$scope.$apply(function(){
        				$scope.mu=index;
        			})
    			});
    			$(".fished").on('click',function(){
    			    var	index=$('.biaoshi').index();
    			    console.log(index)
    			    $scope.$apply(function(){
        				$scope.nu=index;
        			})
    				$(".kuang").hide();
    				return false;
    			})
    		}
    	}
    }])
    app.directive('ngC',[function(){
    	return{
    		restrict:'A',
    		template:'<div class="choices"><div ng-transclude></div></div>',
    		transclude:true,
    		replace:true,
    		link:function($scope,el){
    			$(el).on('click',function(){
    				$(this).next().toggle();
    				return false;
    			})
    			$(".kuang").on('click',false)
    			var sel=this;
    			$(document).on('click',function(){
    				$(".kuang").hide();
    				return false;
    			})
    			
    		}
    	}
    }]);
    app.directive('ngUi',[function(){
    	return{
    		restrict:'A',
    		template:'<div id="listbox"><div ng-transclude></div></div>',
    		transclude:true,
    		replace:true,
    		link:function($scope,el){
    			$(el).on('click','.atv4',function(){
    				$(el).find(".atv4").removeClass('active');
      				$(this).addClass('active');
      				$(el).on('click','input',function(){
        			var index=$(this).closest('.atv4').index();
      					$scope.$apply(function(){
      						 $scope.cu=index;
      					})
      				})
    			})
    			$(document).on('keyup',function(e){
    				//console.log(e.keyCode)
    				var quxiao=$(".removebottom .quxiao");
    				var shanchu=$(".removebottom .shanchu");
    				
    				if(e.keyCode===46){
    					$(".tianchuK").css({"display":'block'})
    					shanchu.on("click",function(){
    						var index=$('.active').index();
	    					if(index<0){
	    						return
	    					}
	    					$scope.$apply(function(){ //用$scope.$apply调用$scope.$digest()
	    						$scope.lists.splice(index,1);
	    						$scope.savelocal();
	    					})
	    					$(".tianchuK").css({"display":"none"});
	    					
    					})
    					quxiao.on('click',function(){
    						$(".tianchuK").css({"display":"none"})
    					})
    				}
    			})
    		}
    	}	
    }]);
 	app.controller('mainCtrl',['$scope',function($scope){
	 		if(localStorage.reminder){
	   	       		$scope.lists=JSON.parse(localStorage.reminder);
	   	       	}else{
	   	       		 $scope.lists=[];
	   	    }
   	       $scope.colorlist=['purple','green','blue','yellow','brown','red','orange'];
   	       $scope.cu=0;
   	        $scope.mu=0;
   	        $scope.nu=0;
   	        $scope.addItem=function(){
   	        	var i={
   	        		name:'',
   	        		status:0
   	        	}
   	        	$scope.lists[$scope.cu].todos.push(i);
   	        }
   	        $scope.count=function(){
   	        	var newarr=[];
   	        	$scope.lists[$scope.cu].todos.forEach(function(v,i){
   	        		if(v.status===1){
   	        		   newarr.push(v);
   	        		}
   	        	})	
   	        	return newarr.length;
   	        }
   	        $scope.removeall=function(){
   	        	var newarr=[];
   	        	$scope.lists[$scope.cu].todos.forEach(function(v,i){
   	        		if(v.status===0){
   	        		   newarr.push(v);
   	        		}
   	        	})	
   	        	$scope.lists[$scope.cu].todos=newarr;
   	        	//$scope.lists[$scope.cu].todos.splice(0)
   	        }
   	        $scope.removesingle=function(index){
   	        	$scope.lists[$scope.cu].todos.splice(index,1)
   	        }
   	        $scope.remove=function(index){
   	        	$scope.lists.splice(index,1)
   	        }
   	       $scope.add=function(){
   	       		var len=$scope.lists.length;
   	       		var num=len%7;
   	       	    var v={
   	       	    	id:maxID()+1,
   	       	    	name:"新列表"+(len+1),
   	       	    	theme:$scope.colorlist[num],
   	       	    	todos:[]
   	       	    	};
   	       	    $scope.lists.push(v);
   	       }
   	       function maxID(){
   	       	    var max=-Infinity;
   	       	    for(var i=0;i<$scope.lists.length;i++){
   	       	    	if($scope.lists[i].id>max){
   	       	    		max=$scope.lists[i].id;
   	       	    	}
   	       	    }
   	       	    return (max===-Infinity)?1000:max;
   	     }
   	       $scope.savelocal=function(){
   	       	  localStorage.reminder=JSON.stringify($scope.lists);
   	       }
 }]);
 
 
/*$(function(){
	var atv4=$("#listbox .atv4");
	atv4.on("click",function(){
		var index=$(this).index();
		atv4.removeClass('active').eq(index).addClass('active');
	})
//	 var icon=atv4.find(".color-icon");
//	 for(var i=0;i<icon.length;i++){
//	 	icon.eq(i).css({'background-position-x':-i*34-34})
//	 }
//	 	
	var li=$(".selection-circle li");
	li.on('click',function(){
		var index=$(this).index();
		li.css({'background-position-y':33}).eq(index).css({'background-position-y':-index*33})
	})
	
	 var flag=true;
	$(".xuanxiang").on('click',function(){
		if(flag){
			$(".kuang").css({"display":"block"});
		}else{
			$(".kuang").css({"display":"none"});
		}
		flag=!flag;
	})
	$(".xuanxiang").on('click',false);
	$('.kuang').on('click',false);
	$(document).on('click',function(){
		$(".kuang").css({"display":"none"});
	})
});
*/