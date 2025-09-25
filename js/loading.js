document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    const loadingText = document.querySelector('#loading p');
    //祖传卡三秒
    setTimeout(()=>{
        loadingText.style.animation= 'fade-out 0.5s ease-in-out';
        
        loadingText.addEventListener('animationend', () => {
            loadingText.style.opacity = '0';
            loading.style.transform = 'translateY(120vh)';
            loading.style.borderRadius = "200px 200px 0 0";
            
            loading.addEventListener('transitionend', () => {
                loading.style.display = 'none';
            });
        });
    },3000);
})
