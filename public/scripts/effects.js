document.querySelectorAll(".buttonDelete").forEach((item, index)=>{
    item.setAttribute("value", index);
});
document.querySelectorAll(".buttonEdit").forEach((item, index)=>{
    item.setAttribute("value", index);
});
document.querySelectorAll(".buttonView").forEach((item, index)=>{
    item.setAttribute("value", index);
})

if(document.querySelector("#heading")){
document.querySelector("#heading").addEventListener("mouseenter", ()=>{
    document.querySelector("#heading").classList.add("mouse-enter")
})
document.querySelector("#heading").addEventListener("mouseleave", ()=>{
    document.querySelector("#heading").classList.remove("mouse-enter")
})
}
if(document.querySelector("#body")){
document.querySelector("#body").addEventListener("mouseenter", ()=>{
    document.querySelector("#body").classList.add("mouse-enter")
})
document.querySelector("#body").addEventListener("mouseleave", ()=>{
    document.querySelector("#body").classList.remove("mouse-enter")
})
}
if(document.querySelector("#password")){
document.querySelector("#password").addEventListener("mouseenter", ()=>{
    document.querySelector("#password").classList.add("mouse-enter")
})
document.querySelector("#password").addEventListener("mouseleave", ()=>{
    document.querySelector("#password").classList.remove("mouse-enter")
})
}