/// <reference types="../@types/jquery" />

// ------------------- start media query variables -------------------
var meduimScreen = window.matchMedia("(max-width: 992px)");
var smallScreen = window.matchMedia("(max-width: 576px)");
// ------------------- end media query variables -------------------
var links = document.querySelectorAll('.navbar-links a')
var inputs = document.querySelectorAll('#validationContainer input')
// ------------------- start loadind screen code -------------------
$(function(){
    $('.loader').slideDown(1000,function(){
        $('.loading').fadeOut(1000,function(){
            $('body').css('overflow','auto')
            $(".side-menu").show()
            $('.loading').remove()
        })
    }
    )
    
})
// ------------------- end loadind screen code -------------------

// ------------------- start open and close navbar -------------------
$('.nav-bars').on('click',function(){
    if ($(this).hasClass('fa-bars')) {
        if(smallScreen.matches){
            $(this).removeClass('fa-bars')
            $(this).addClass('fa-xmark')
            $('.side-menu').animate({'left' : '0'} , 500)
            $('.navbar-links a').animate({'marginTop' : '0%'} , 750)
        }
        else{
            $(this).removeClass('fa-bars')
        $(this).addClass('fa-xmark')
        $('.side-menu').animate({'left' : '0'} , 500)
        $('.navbar-links a').animate({'marginTop' : '0%'} , 750)
        $('.navbar-icons').css('marginLeft','-80px',250)
        }
    }else{
        if(smallScreen.matches){
            $(this).addClass('fa-bars')
            $(this).removeClass('fa-xmark')
            if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
                $('.side-menu').animate({'left' : '-75%'} , 500)
            }else{
                $('.side-menu').animate({'left' : '-65.5%'} , 500)
            }
            $('.navbar-links a').animate({'marginTop' : '150%'} , 1000)
            $('.navbar-icons').css('marginLeft','0px',100)
        }
        else if(meduimScreen.matches){
            $(this).addClass('fa-bars')
        $(this).removeClass('fa-xmark')
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-45.5%'} , 500)
        }
        $('.navbar-links a').animate({'marginTop' : '150%'} , 1000)
        $('.navbar-icons').css('marginLeft','0px',100)
        }
        else{
            $(this).addClass('fa-bars')
        $(this).removeClass('fa-xmark')
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-22.5%'} , 500)
        }
        $('.navbar-links a').animate({'marginTop' : '150%'} , 1000)
        $('.navbar-icons').css('marginLeft','0px',100)
        }

    }
})
// ------------------- end open and close navbar -------------------

// ------------------- start All meals -------------------
// ------------------- get All meals function -------------------
getAllMeals()
async function getAllMeals() {
    const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    const recipies = await api.json()
    console.log(recipies.meals);
    dislplayAllMeals(recipies.meals)
}
// ------------------- after getting All meals display All meals function -------------------
function dislplayAllMeals(recipies){
    let cartoona = '';
    for (let i = 0; i < recipies.length; i++) {
        // console.log(recipies[i].idMeal)
        cartoona+=
        `
        <div class="col-md-3 g-4">
            <div class="card rounded" onclick="getDetails(${recipies[i].idMeal})">
              <div class="card-image">
              <img src="${recipies[i].strMealThumb}" class="card-img" alt="">
              </div>
              <div class="card-body">
                <div class="layer">
                  <h4 class="card-title">${recipies[i].strMeal}</h4>
                </div>
              </div>
            </div>
          </div>
        `
    }
    $('.mainsection .container .container-meal .row').html(cartoona)
} 
// ------------------- end All meals -------------------
//function of display when search 

// ------------------- start details meal -------------------
// ------------------- get details of any meal function -------------------
async function getDetails(id){
    $('.loader').fadeIn(0)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const res = await api.json()
    $('.loader').fadeOut(500)
    $(".search").addClass("d-none")
    $('.mainsection .container .container-meal').addClass('d-none')
    $('.mainsection .container .meal-details').removeClass('d-none')
    let recipiesMeals = []
    let recipiesMeal =[]
    for (let index = 1; index <= 20; index++) {
        recipiesMeals.push('strIngredient' + `${index}`)
    }
    for (let index = 0; index < recipiesMeals.length; index++) {
        if (res.meals[0][recipiesMeals[index]] != '' && res.meals[0][recipiesMeals[index]] != null && res.meals[0][recipiesMeals[index]] != ' ' ) {
            recipiesMeal.push(res.meals[0][recipiesMeals[index]])
        }
        // console.log(res.meals[0][recipiesMeals[index]]);
    }
    let Amounts = []
    let amount =[]
    for (let index = 1; index <= 20; index++) {
        Amounts.push('strMeasure' + `${index}`)
    }
    for (let index = 0; index < Amounts.length; index++) {
        if (res.meals[0][Amounts[index]] != ' ' && res.meals[0][Amounts[index]] != '' && res.meals[0][Amounts[index]] != null) {
            amount.push(res.meals[0][Amounts[index]])
        }
    }
    let tags = res.meals[0].strTags
    let finalTags = [];
    if (tags != null) {
        finalTags = res.meals[0].strTags.split(',')
    }
    dislplaySingleMeal(res.meals[0])
    displayIngredients(recipiesMeal , amount )
    displayTag(finalTags)
    $(window).scrollTop(0)
    $('.serach').addClass('d-none')
    $('.mainsection').removeClass('d-none')


}
// ------------------- get details of one meal function -------------------
function dislplaySingleMeal(data){
    let cartoona =
        `
        <div class="col-md-4">
            <div class=" rounded-2 bg-danger position-relative overflow-hidden">
            <img src="${data.strMealThumb}" class="w-100 h-100" alt="${data.strMeal}">
            </div>
            <h2 class="meal-caption text-white ms-1 ">
            ${data.strMeal}
            </h2>
        </div>
        <div class="col-md-8">
            <div class="instructions text-white ">
            <h1>Instructions:</h1>
            <p>
            ${data.strInstructions}
            </p>
            <h2>Area : 
            <span class="h3">${data.strArea}</span>
            </h2>
            <h2>Category : 
            <span class="h3">${data.strCategory}</span>
            </h2>
            <h3 class="mt-1">Recipes :</h3>
            <div class="container mt-3 ">
                <div class="d-flex flex-wrap gy-2 gx-1" id="meal-ingredient">
                </div>
            </div>
            <h3 class="mt-3">Tags :</h3>
            <div class="container mt-3 ">
                <div class="d-flex flex-wrap gy-2 gx-1" id="recipies-tags">
                </div>
            </div>
            
            <div class="mt-5 meal-footer">
                <a href="${data.strSource}" target='_blank' class="btn btn-success source">Source</a>
                <a href="${data.strYoutube}" target='_blank' class="btn btn-danger youtube">Youtube</a>
            </div>
            </div>
        </div>
        `
        $('.mainsection .container .meal-details').html(cartoona)
}
// ------------------- get ingredients with amounts of a meal function -------------------
function displayIngredients(arr1 , arr2){
    let cartoona= ''
    for (let index = 0; index < arr1.length; index++) {
        cartoona+=
        `
        <div class="pt-4 pe-2 ">
            <span class="alert alert-info p-1" role="alert">
            ${arr2[index]} ${arr1[index]}
            </span>
        </div>
        `
    }
    console.log(cartoona)
    document.getElementById("meal-ingredient").innerHTML=cartoona
}
// ------------------- get tags of a meal function -------------------
function displayTag(array){
    let cartoona = '';
    for (let index = 0; index < array.length; index++) {
        cartoona +=
        `
        <div class="pt-4 pe-2">
            <span class="alert alert-danger p-1" role="alert">
            ${array[index]}
            </span>
        </div>
        `
    }
    document.getElementById("recipies-tags").innerHTML=cartoona
}
// ------------------- end detils meal -------------------

// ------------------- start All meals -------------------
links[0].addEventListener('click' , function(){
    $('.mainsection').addClass('d-none')
    $('.search').removeClass('d-none')
    
            if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
                $('.side-menu').animate({'left' : '-75%'} , 500)
            }else{
                $('.side-menu').animate({'left' : '-22.5%'} , 500)
            }
            $('.navbar-links a').animate({'marginTop' : '150%'} , 1000)
            $('.navbar-icons').css('marginLeft','0px',100)
            $(".nav-bars").removeClass('fa-xmark')
    
    $(".nav-bars").addClass('fa-bars')
    if(meduimScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-45.5%'} , 500)
        }
    }
    if(smallScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-65.5%'} , 500)
        }
    }
            
            


})

document.getElementById('name').addEventListener('keyup' , function(){
    let searchInputValue = this.value;
    searchByName(searchInputValue)
})
async function searchByName(meal){
    $('.loader').removeClass('d-none')
    $('.loader').fadeIn(500)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    const res = await api.json()
    displaySearchByName(res.meals)
    $('.loader').fadeOut(500)
}
function displaySearchByName(recipies){
    let cartoona = '';
    for (let i = 0; i < recipies.length; i++) {
        cartoona+=
        `
        <div class="col-md-3 g-4">
            <div class="card rounded"  onclick="getDetails(${recipies[i].idMeal})">
              <div class="card-image">
              <img src="${recipies[i].strMealThumb}" class="card-img" alt="">
              </div>
              <div class="card-body">
                <div class="layer">
                  <h4 class="card-title">${recipies[i].strMeal}</h4>
                </div>
              </div>
            </div>
          </div>
        `
    }
    console.log(cartoona)

    $('#data-search').html(cartoona)
}

document.getElementById('firstLetter').addEventListener('keyup' , function(){
    let searchInputValue = this.value;
    if (searchInputValue.length == 1) {
        searchByFirstLetter(searchInputValue)
    }
})
//function get data when search with first char.
async function searchByFirstLetter(char){
    $('.loader').fadeIn(500)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
    const res = await api.json()
    // console.log(res);

    displaysearchByFirstLetter(res.meals)
    $('.loader').fadeOut(500)
}
//function of display when search with first char.
function displaysearchByFirstLetter(recipies){
    let cartoona = ''
    for (let i = 0; i < recipies.length; i++) {
        cartoona +=
       `
        <div class="col-md-3 g-4">
            <div class="card rounded" onclick="getDetails(${recipies[i].idMeal})">
              <div class="card-image">
              <img src="${recipies[i].strMealThumb}" class="card-img" alt="">
              </div>
              <div class="card-body">
                <div class="layer">
                  <h4 class="card-title">${recipies[i].strMeal}</h4>
                </div>
              </div>
            </div>
          </div>
        `
    }
    $('#data-search').html(cartoona)
}
















// ------------------- start all categories -------------------
links[1].addEventListener('click' , function(){{
    $('#validationContainer').addClass('d-none')
    $('.mainsection .container .container-meal .row').removeClass('d-none')
    $('.search').addClass('d-none')
    if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
        $('.side-menu').animate({'left' : '-75%'} , 500)
    }else{
        $('.side-menu').animate({'left' : '-22.5%'} , 500)
    }
    $('.navbar-links a').animate({'marginTop' : '150%'} , 1000)
    $('.navbar-icons').css('marginLeft','0px',100)
    $(".nav-bars").removeClass('fa-xmark')
    
    $(".nav-bars").addClass('fa-bars')
    if(meduimScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-45.5%'} , 500)
        }
    }
    if(smallScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-65.5%'} , 500)
        }
    }
    category()
}})
async function category(){
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const res = await api.json()
    // console.log(res.categories);
    displayCategory(res.categories)
    $('.loader').fadeOut(500)
}
//function of display data of categories 
function displayCategory(res){
    let cartoona = ''
    for (let i = 0; i < res.length; i++) {
        cartoona +=
        `
        

        <div class="col-md-3 g-4">
        <div class="card special" onclick='mealOfCategory("${res[i].strCategory }")'>
        <div class="card-image">
        <img src='${res[i].strCategoryThumb}' class='w-100 h-100'>
              </div>   
               <div class="card-body">
                <div class="layer vstack">
                <h3 class="my-auto fw-bold text-capitalize text-center">${res[i].strCategory}</h3>
                                <p class="my-auto text-center text-capitalize">${res[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>

                </div>
              </div> 
            
        </div></div>
        `
    }
    // console.log(cartoona)
    $('.mainsection .container .container-meal .row').html(cartoona)
}
async function mealOfCategory(cate){
    // console.log(cate);
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`)
    const res = await api.json()
    // console.log(res.meals.slice(0,20));
    dislplayAllMeals(res.meals.slice(0,20))
    $('.loader').fadeOut(500)
}
// ------------------- end all categories -------------------

// ------------------- start all areas -------------------
links[2].addEventListener('click' , function(){
    $('.mainsection').removeClass('d-none')
    $('.mainsection .container .meal-details').addClass('d-none')
    $('#validationContainer').addClass('d-none')
    $('.mainsection .container .container-meal .row  ').removeClass('d-none')
    $('.serach').addClass('d-none')
    if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
        $('.side-menu').animate({'left' : '-75%'} , 500)
    }else{
        $('.side-menu').animate({'left' : '-22.5%'} , 500)
    }
    $('.navbar-links a').animate({'marginTop' : '150%'} , 1000)
    $('.navbar-icons').css('marginLeft','0px',100)
    $(".nav-bars").removeClass('fa-xmark')
    
    $(".nav-bars").addClass('fa-bars')
    if(meduimScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-45.5%'} , 500)
        }
    }
    if(smallScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-65.5%'} , 500)
        }
    }
    Area()
})
async function Area(){
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const res = await api.json()
    // console.log(res.meals);
    displayArea(res.meals)
    $('.loader').fadeOut(500)
}
function displayArea(res){
    let cartoona = ''
    for (let i = 0; i < res.length; i++) {
        cartoona +=
        `
    

        <div class="col-md-3 g-4">
            <div class=" rounded-2 meal-container d-flex flex-column align-items-center justify-content-center overflow-hidden text-white"
            onclick='mealOfArea("${res[i].strArea }")'>
                <i class="fa-solid fa-house-laptop fa-4x d-block cursor"></i>
                <h3 class="mt-2 fw-bold text-capitalize text-center">${res[i].strArea}</h3>
            </div>
            </div>
        `
    }
    $('.mainsection .container .container-meal .row').html(cartoona)
}
async function mealOfArea(area){
    $(window).scrollTop(0)
    // console.log(area);
    $('.loader').fadeIn(0)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    const res = await api.json()
    // console.log(res.meals);
    dislplayAllMeals(res.meals)
    $('.loader').fadeOut(500)
}
// ------------------- end all areas -------------------

// ------------------- start all ingredients -------------------
links[3].addEventListener('click' , function(){
    $('mainsection').removeClass('d-none')
    $('.mainsection .container .meal-details').addClass('d-none')
    $('#validationContainer').addClass('d-none')
    $('.mainsection .container .container-meal .row').removeClass('d-none')
    $('.serach').addClass('d-none')
    if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
        $('.side-menu').animate({'left' : '-75%'} , 500)
    }else{
        $('.side-menu').animate({'left' : '-22.5%'} , 500)
    }
    $('.navbar-links a').animate({'marginTop' : '150%'} , 1000)
    $('.navbar-icons').css('marginLeft','0px',100)
    $(".nav-bars").removeClass('fa-xmark')
    
    $(".nav-bars").addClass('fa-bars')
    if(meduimScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-45.5%'} , 500)
        }
    }
    if(smallScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-65.5%'} , 500)
        }
    }
    Ingredients()    
})
async function Ingredients(){
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    const res = await api.json()
    console.log(res.meals.slice(0,20));
    displayIngredient(res.meals.slice(0,20))
    $('.loader').fadeOut(500)
}
function displayIngredient(res){
    let cartoona = ''
    for (let index = 0; index < res.length; index++) {
        cartoona +=
        `
        <div class="col-md-3 g-4">
            <div class=" rounded-2 meal-container cursor d-flex flex-column align-items-center justify-content-center overflow-hidden text-white"onclick='mealsOfIngredient("${res[index].strIngredient }")'>
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="mt-2 fw-bold text-capitalize text-center">${res[index].strIngredient}</h3>
                <p class="mt-2 fw-bold text-capitalize text-center">${res[index].strDescription.split(' ').slice(0,20).join(' ')}</p>
            </div>
            </div>
        `
    }
    $('.mainsection .container .container-meal .row').html(cartoona)
}
async function mealsOfIngredient(Ingredients){
    console.log(Ingredients);
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    const res = await api.json()
    console.log(res.meals);
    dislplayAllMeals(res.meals)
    $('.loader').fadeOut(500)
}
// ------------------- end all ingredients -------------------

// ------------------- start contact form -------------------
links[4].addEventListener('click' , (e)=>{
    e.preventDefault()
    $('mainsection').removeClass('d-none')
    $('.mainsection .container .meal-details').addClass('d-none')
    $('#validationContainer').removeClass('d-none')
    $('.mainsection .container .container-meal .row').addClass('d-none')
    $('.serach').addClass('d-none')
    if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
        $('.side-menu').animate({'left' : '-75%'} , 500)
    }else{
        $('.side-menu').animate({'left' : '-22.5%'} , 500)
    }
    $('.navbar-links a').animate({'marginTop' : '150%'} , 1000)
    $('.navbar-icons').css('marginLeft','0px',100)
    $(".nav-bars").removeClass('fa-xmark')
    
    $(".nav-bars").addClass('fa-bars')
    if(meduimScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-45.5%'} , 500)
        }
    }
    if(smallScreen.matches){
        if ($('.side-menu').innerWidth() == $('body').innerWidth() ) {
            $('.side-menu').animate({'left' : '-75%'} , 500)
        }else{
            $('.side-menu').animate({'left' : '-65.5%'} , 500)
        }
    }
})
document.forms[0].addEventListener('submit' , (e)=>{
    e.preventDefault()
})
document.forms[0].addEventListener('keyup' , (e)=>{
    if (validateName() && validateEmail() && validatePhone() && validateAge() && validatePasswoed() && validateRepassword() )  {
        $('#submit').removeAttr('disabled')
        $('#submit').addClass('btn-success')
        $('#submit').removeClass('btn-outline-danger')
    }else{
        
        $('#submit').attr('disabled' , 'true')
        $('#submit').removeClass('btn-success')
        $('#submit').addClass('btn-outline-danger')
    }
})
document.querySelectorAll('.pass-input i').forEach(ele => {
    ele.addEventListener('click' , function(){
        if ($(this).next().val().length > 0 && $(this).hasClass('fa-eye') ) {
            $(this).removeClass('fa-eye')
            $(this).addClass('fa-eye-slash')
            $(this).next().attr('type' , 'text')
        } else {
            $(this).addClass('fa-eye')
            $(this).removeClass('fa-eye-slash')
            $(this).next().attr('type' , 'password')
        }
    })
})

// ------------------- start validation functions  -------------------
function validateName(){
    const regex = /^[A-Za-z][A-z a-z]*$/

    if (regex.test(inputs[0].value)) {
        $(inputs[0]).addClass('is-valid')
        $(inputs[0]).removeClass('is-invalid')
        return true
    }else{
        $(inputs[0]).addClass('is-invalid')
        $(inputs[0]).removeClass('is-valid')
        return false
    }
}
function validateEmail(){
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    if (regex.test(inputs[1].value)) {
        $(inputs[1]).addClass('is-valid')
        $(inputs[1]).removeClass('is-invalid')
        return true
    }else{
        $(inputs[1]).addClass('is-invalid')
        $(inputs[1]).removeClass('is-valid')
        return false
    }
}
function validatePhone(){
    const regex = /^(02)?(01)[0125][0-9]{8}$/

    if (regex.test(inputs[2].value)) {
        $(inputs[2]).addClass('is-valid')
        $(inputs[2]).removeClass('is-invalid')
        return true
    }else{
        $(inputs[2]).addClass('is-invalid')
        $(inputs[2]).removeClass('is-valid')
        return false
    }
}
function validateAge(){
    const regex = /^([1-7][0-9]|80)$/

    if (regex.test(inputs[3].value)) {
        $(inputs[3]).addClass('is-valid')
        $(inputs[3]).removeClass('is-invalid')
        return true
    }else{
        $(inputs[3]).addClass('is-invalid')
        $(inputs[3]).removeClass('is-valid')
        return false
    }
}
function validatePasswoed(){
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (regex.test(inputs[4].value)) {
        $(inputs[4]).addClass('is-valid')
        $(inputs[4]).removeClass('is-invalid')
        return true
    }else{
        $(inputs[4]).addClass('is-invalid')
        $(inputs[4]).removeClass('is-valid')
        return false
    }
}
function validateRepassword(){
    const checkPassword = (inputs[4].value == inputs[5].value) 
    if (checkPassword) {
        $(inputs[5]).addClass('is-valid')
        $(inputs[5]).removeClass('is-invalid')
        return true
    }else{
        $(inputs[5]).addClass('is-invalid')
        $(inputs[5]).removeClass('is-valid')
        return false
    }
}
// ------------------- end all ingredients -------------------
// ------------------- end contact form -------------------
