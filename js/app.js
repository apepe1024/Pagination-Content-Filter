"use strict";
//global variables
const studentItems = $('.student-item');
const appendSearch ='<div class="student-search"><input id="search" placeholder="Search for students..."><button>Search</button></div>';
const pagination ='<div class="pagination"><ul></ul></div>';
//appends search markup dynamically in DOM
$('.page-header.cf').append(appendSearch);
//generates an array of 10 students for each page
const pages = list => {
	let oldList = list.slice();
	let pagesArray = [];
	while (oldList.length) {
		pagesArray.push(oldList.splice(0,10));
	}
	return pagesArray;
}
//another global variable for studentItems' pages
const studentList = pages(studentItems);
//display first page, hide others
const showPages = (pageNumber, pageList) => {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast');
        });
      }
  });
}
//append page buttons to DOM
const appendButtons = pageList => {
	$('.page').append(pagination);
	let numPages = pageList.length;
	for (let i = 1; i <= numPages; i++) {
		let buttons = '<li><a href="#">' + i + '</a></li>';
		$('.pagination ul').append(buttons);
	}
	$('.pagination ul li a').first().addClass('active');
	//add click listeners, add & remove active class on click, on load add active class to first button
	  $(".pagination ul li a").on("click", function(e) {
	    let pageSelection = parseInt($(this)[0].text) - 1;
	    showPages(pageSelection, pageList);
	    $(".pagination ul li a").removeClass();
	    $(this).addClass("active");
	    e.preventDefault();
	  });
}
//searches both name and email. If no results found, appends H2 to display No Results; else display default. On searchList call, check input value to see if matches; if matches, generate new student array & display buttons
const searchList = () => {
    let searchTerm = $('#search').val().toLowerCase().trim();
        let filteredStudents = studentItems.filter(function(i) {
        	let studentEmail = $(this).find('.email').text();
            let studentNames = $(this).find('h3').text();
            if (studentNames.indexOf(searchTerm) > -1 || studentEmail.indexOf(searchTerm) > -1) {
                return true;
            }
            return false;
        });
        if (filteredStudents.length === 0 ) {
        	$('.page-header h2').text('No Results');
        } else {
        	$('.page-header h2').text('STUDENTS');
        }
        let paginated_students = pages(filteredStudents);
        $('.pagination').remove();
        if (filteredStudents.length >= 10) {
          appendButtons(paginated_students);
        }
        showPages(0, paginated_students);
}
// inits
appendButtons(studentList);
showPages(0, studentList);
//event handlers, click and enter key
$(".student-search button").click( () => {
  searchList();
});
$(".student-search input").keydown( (event) => {
  if (event.which === 13) {searchList();}
});
