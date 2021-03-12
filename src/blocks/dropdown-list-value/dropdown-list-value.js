let DropDownСounter={
  adults:0,
  children:0,
  babies:0,
};

let Father;
let idFather;
let currentElem;
let valueRestriction = 10; // ограничитель мааксимального количества
let plholder =34;// значение в поле инпута
let elem_placeholder;
let ps = document.querySelectorAll('.dropdown-list__ctrl');	//нахожу все элементы с селектором, (возвращается севдомассив)
let arrow = document.querySelector('.dropDownList__arrow') // ищем стрелку и помещаем в переменую
let dropWrapper = document.querySelector('.text-field__item-wrap'); // обертка вокруг строк счетчика
let inputField = document.querySelector('.dropDownList__input-field');
let clearBtn = document.querySelector('.dropDownList__clear');
let acceptBtn = document.querySelector('.dropDownList__accept');

function propSum(){
  let x = 0;
  for(let key in DropDownСounter){
    x = DropDownСounter[key] + x;
  }
  return x;
} 
propSum();
for(var i = 0; i < ps.length; i++){	//устанавливаю обработчики событий
  ps[i].addEventListener('click', findFather, false);
}

function findFather(e){
  currentElem= e.currentTarget;// получил текущий элемент на который нажата ЛКМ
  Father = currentElem.parentElement; // получил  родителя
     idFather = String(Father.id); //получил id родителя в виде строки
     setValue();
}   

function wordEnd(num, words){ //функция добавляет окончания в праильном падаеже
  return words[((num%100 > 10 && num%100 < 15) || num%10 > 4 || num%10 == 0)? 2 : (num%10 == 1)? 0 : 1];	
}

function setValue(){
  if(currentElem.classList.contains('dropdown-list__plus')){	//проверка если нажали плюс
      if(DropDownСounter[idFather]<valueRestriction)
      DropDownСounter[idFather] = DropDownСounter[idFather]+1; // прибавляем зачение объекта на 1
      Father.querySelector('.value_int').innerText = DropDownСounter[idFather];	// записываем в разметку
      chkClassClear();
  } 
  if(currentElem.classList.contains('dropdown-list__minus')){	//проверка если нажали минус
      if(DropDownСounter[idFather]>0)
        DropDownСounter[idFather] = DropDownСounter[idFather]-1; // уменьшает значение объекта на 1
              Father.querySelector('.value_int').innerText = DropDownСounter[idFather];	// записываем в разметку
              chkClassClear();
  }
  lightCicle();
  inputValue();  
} 

function lightCicle(){ // подсвечивание кругляшек вокруг минусов
  
    if(DropDownСounter[idFather]>0){
      Father.querySelector('.dropdown-list__minus').classList.remove('inactiveColor')
    } else if(DropDownСounter[idFather]==0){
      Father.querySelector('.dropdown-list__minus').classList.add('inactiveColor')
    } 
}

function inputValue(){ // устанавлиеваем значение в input
  inputField.setAttribute('placeholder', propSum() + wordEnd(propSum(),[' гость',' гостя',' гостей'])); 
  if (propSum() == 0){
    inputField.setAttribute('placeholder', 'Сколько гостей');
  }
}

arrow.onclick = function(){ // вешаем обработчик событий НА СТРЕЛКУ
  dropWrapper.classList.toggle("hidden"); //скрываем открвыаем по нажатию
  inputField.classList.toggle('dropDownList__border');
  

}
acceptBtn.onclick = function(){ //при нажатии кнопки ПРИМЕНИТЬ
  dropWrapper.classList.add("hidden");
  inputField.classList.remove('dropDownList__border');
}

clearBtn.onclick = function(){ //при нажатии кнопки ОЧИСТИТЬ
  this.classList.add("hidden")
  for (let key in DropDownСounter){
    DropDownСounter[key] = 0;
  }
  inputField.setAttribute('placeholder', 'Сколько гостей');
  let valueClass = document.querySelectorAll('.value_int');
  for(let i = 0; i < valueClass.length; i++){
    valueClass[i].innerText = 0;
  }
  let inactiveCicle = document.querySelectorAll('.dropdown-list__minus');
  for(let i = 0; i < inactiveCicle.length; i++){
    inactiveCicle[i].classList.add('inactiveColor');
  }
}
function chkClassClear(){
  if(propSum()==0){
    clearBtn.classList.add('hidden')
  } else{
    clearBtn.classList.remove('hidden')
  }
}

