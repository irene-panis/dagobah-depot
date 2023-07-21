let darkMode = localStorage.getItem("dark-mode");
//darkMode will be a string
if(darkMode != null && darkMode === 'true'){
    $(element).addClass("dark_mode");
}