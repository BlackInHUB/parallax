"use strict"

//Для очікування завантаження контенту
window.onload = function () {
    const parallax = document.querySelector('.parallax');

    //Перевіряємо наявність контейнеру на сторінці
    if (parallax) {
        const parallaxContainer = document.querySelector('.parallax__container');
        const clouds = document.querySelector('.images-parallax__clouds');
        const mountains = document.querySelector('.images-parallax__mountains');
        const human = document.querySelector('.images-parallax__human');

        //Коєфіцієнти
        const forClouds = 40;
        const forMountains = 20;
        const forHuman = 10;

        //Швидкісь анімації
        const speed = 0.05;

        //Змінні анімації
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        const setMouseParallaxStyle = () => {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            //Передаємо стилі напряму в css
            clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`;
            human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%);`;

            requestAnimationFrame(setMouseParallaxStyle);
        };

        setMouseParallaxStyle();

        parallax.addEventListener('mousemove', function (e) {
            //Щоразу перевіряємо висоту та ширину контейнера
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            //Обнуляємо посередині екрану
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            //Отримуємо відстань руху миші в %
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });

        //Паралакс при скролі
        //Створюємо масив порогів
        let thresholdSets = [];
        //Наповнюємо масив порогами
        for (let i = 0; i <= 1; i += 0.005) {
            thresholdSets.push(i);
        };
        //Колбек для кожного порогу
        const callback = (entries, observer) => {
            //Відсоток прокрученох області починаючи від верха сайту
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopProcent);
        };

        //Запуск колбеку по досягнунню кожного порогу
        const observer = new IntersectionObserver(callback, {threshold: thresholdSets});

        //Об'єкт, при зміні якого відбуватимуться дії з колбеком по порогам
        observer.observe(document.querySelector('.content'));

        function setParallaxItemsStyle(scrollTopProcent) {
            //Значення на які ділиться scrollTopProcent відповідають за швидкість руху
            parallaxContainer.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`;
            mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`;
            human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%);`;
        }

    };
};