import { characterData } from './characterData.js';

class Carousel {
    constructor() {
        this.characters = Array.from(document.querySelectorAll('#character img'));
        this.profile = document.getElementById('profile');
        this.charNameCn = document.getElementById('char-name-cn');
        this.charNameEn = document.getElementById('char-name-en');
        this.info = document.getElementById('info');
        this.modal = document.getElementById('character-modal');
        this.modalImage = document.getElementById('modal-character-image');
        
        //状态管理
        this.currentIndex = 0;
        this.isAnimating = false;
        this.scrollCount = 0;
        
        //状态定义
        this.states = ['far-out', 'far', 'near', 'close', 'out'];
        //每个角色的位置
        this.statePositions = new Array(this.characters.length).fill(0);
        
        //模态框状态
        this.isModalOpen = false;
        this.originalEventHandlers = {};
        
        this.init();
    }
    
    init() {
        //初始化角色状态
        this.characters.forEach((char, index) => {
            char.classList.remove('hide');
            if (index === 0) {
                //far-out状态
                this.statePositions[index] = 0;
                char.className = 'far-out';
            } else {
                //隐藏状态
                this.statePositions[index] = -1;
                char.style.display = 'none';
            }
        });
        // this.characters.forEach((char, index) => {
        //     char.classList.remove('hide');
        //     if (index === 0){
        //         //out
        //         this.statePositions[index]=0;
        //         char.className = 'out';
        //     }
        //     else if (index === 1){
        //         this.statePositions[index]=1;
        //         char.className = 'close';
        //     }
        //     else if (index === 2){
        //         this.statePositions[index]=2;
        //         char.className = 'near'
        //     }
        //     else if (index === 3){
        //         this.statePositions[index]=3;
        //         char.classList = 'far'
        //     }
        //     else{
        //         this.statePositions[index]=-1;
        //         char.style.display = 'none';
        //     }
        // })
        
        this.hideProfile();
        
        this.bindEvents();
    }
    
    //事件绑定
    bindEvents() {
        //保存原始事件处理函数
        this.originalEventHandlers.wheel = (e) => {
            e.preventDefault();
            if (this.isAnimating || this.isModalOpen) return;
            
            if (e.deltaY > 0) {
                this.nextCharacter();
            } else {
                this.prevCharacter();
            }
        };
        
        this.originalEventHandlers.keydown = (e) => {
            if (this.isAnimating || this.isModalOpen) return;
            
            switch(e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextCharacter();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevCharacter();
                    break;
            }
        };
        
        //鼠标滚轮事件
        document.addEventListener('wheel', this.originalEventHandlers.wheel, { passive: false });
        
        //键盘事件
        document.addEventListener('keydown', this.originalEventHandlers.keydown);
        //dog按键事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.hideCharacterModal();
            }
        });
        
        //单击事件
        document.addEventListener('click', (e) => {
            if (this.isAnimating) return;
            
            const clickedChar = e.target.closest('#character img');
            if (clickedChar) {
                const charIndex = this.characters.indexOf(clickedChar);
                this.showCharacterModal(charIndex);
            }
            
            // 关闭弹窗
            if (e.target.classList.contains('modal-overlay') ||
                e.target.classList.contains('modal-close')) {
                this.hideCharacterModal();
            }
        });
    }
    
    //dog
    showCharacterModal(characterIndex) {
        const char = this.characters[characterIndex];
        const imageName = char.src.split('/').pop();
        const data = characterData[imageName];
        
        if (data) {
            this.modalImage.src = char.src;
            
            this.modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // 禁用角色切换
            this.isModalOpen = true;
            
            // 添加卡牌倾斜效果
            this.addCardTiltEffect();
        }
    }
    hideCharacterModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // 重新启用角色切换
        this.isModalOpen = false;
        
        // 移除卡牌倾斜效果
        this.removeCardTiltEffect();
    }
    
    //轮播
    nextCharacter() {
        this.scrollCount++;
        
        this.characters.forEach((char, index) => {
            if (this.statePositions[index] >= 0) {
                this.statePositions[index]++;
                
                if (this.statePositions[index] >= this.states.length) {
                    //移出屏幕
                    char.style.display = 'none';
                    this.statePositions[index] = -1;
                } else {
                    char.className = this.states[this.statePositions[index]];
                }
            }
        });
        
        //检查
        let needNewCharacter = true;
        this.characters.forEach((char, index) => {
            if (this.statePositions[index] === 0) {
                needNewCharacter = false;
            }
        });
        
        if (needNewCharacter) {
            //下一个角色
            this.currentIndex = (this.currentIndex + 1) % this.characters.length;
            const newChar = this.characters[this.currentIndex];
            newChar.style.display = 'block';
            this.statePositions[this.currentIndex] = 0;
            newChar.className = this.states[0]; //far-out
        }
        
        //检查near状态
        this.characters.forEach((char, index) => {
            if (this.statePositions[index] === 2) { //near状态
                this.updateProfile(index);
            }
        });
        
        this.handleAnimation();
    }
    prevCharacter() {
        this.characters.forEach((char, index) => {
            if (this.statePositions[index] >= 0) {
                this.statePositions[index]--;
                
                if (this.statePositions[index] < 0) {
                    char.style.display = 'none';
                    this.statePositions[index] = -1;
                } else {
                    char.className = this.states[this.statePositions[index]];
                }
            }
        });
        
        let needNewCharacter = true;
        this.characters.forEach((char, index) => {
            if (this.statePositions[index] === this.states.length - 1) {
                needNewCharacter = false;
            }
        });
        
        if (needNewCharacter) {
            this.currentIndex = (this.currentIndex - 1 + this.characters.length) % this.characters.length;
            const newChar = this.characters[this.currentIndex];
            newChar.style.display = 'block';
            this.statePositions[this.currentIndex] = this.states.length - 1;
            newChar.className = this.states[this.states.length - 1];
        }
        
        this.characters.forEach((char, index) => {
            if (this.statePositions[index] === 2) {
                this.updateProfile(index);
            }
        });
        
        this.handleAnimation();
    }
    
    updateProfile(characterIndex) {
        const char = this.characters[characterIndex];
        const imageName = char.src.split('/').pop();
        const data = characterData[imageName];
        
        if (data) {
            this.charNameCn.textContent = data.nameCn;
            this.charNameEn.textContent = data.nameEn;
            this.info.textContent = data.info;
            
            //显示角色信息
            this.profile.classList.remove('hide');
            this.profile.style.animation = 'fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            setTimeout(()=>{
                this.profile.classList.add('show');
            },800);
        }
    }
    hideProfile() {
        this.profile.classList.remove('show');
        this.profile.classList.add('hide');
    }
    
    handleAnimation() {
        this.isAnimating = true;
        
        let hasNearCharacter = false;
        this.characters.forEach((char, index) => {
            if (this.statePositions[index] === 2) {
                hasNearCharacter = true;
            }
        });
        
        if (!hasNearCharacter) {
            this.hideProfile();
        }
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    
    // 卡牌倾斜效果
    
    //集中绑定
    addCardTiltEffect() {
        if (!this.modalImage) return;
        
        this.isFlipped = false;
        
        this.modalImage.addEventListener('mousemove', this.handleCardTilt.bind(this));
        this.modalImage.addEventListener('mouseleave', this.resetCardTilt.bind(this));
        this.modalImage.addEventListener('click', this.handleCardFlip.bind(this));
    }
    removeCardTiltEffect() {
        if (!this.modalImage) return;
        
        this.modalImage.removeEventListener('mousemove', this.handleCardTilt.bind(this));
        this.modalImage.removeEventListener('mouseleave', this.resetCardTilt.bind(this));
        this.modalImage.removeEventListener('click', this.handleCardFlip.bind(this));
        
        this.isFlipped = false;
    }
    
    handleCardTilt(e) {
        const rect = this.modalImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // 计算倾斜角度
        const rotateX = (mouseY / rect.height) * -30;
        const rotateY = (mouseX / rect.width) * 30;
        
        const translateZ = Math.abs(mouseX) + Math.abs(mouseY);
        
        const flipScale = this.isFlipped ? -1 : 1;
        
        this.modalImage.style.transform = `
            perspective(1000px)
            scaleX(${flipScale})
            rotateX(${Math.max(-15, Math.min(15, rotateX))}deg)
            rotateY(${Math.max(-15, Math.min(15, rotateY))}deg)
            translateZ(${Math.min(20, translateZ * 0.1)}px)
            scale(1.05)
        `;
    }
    resetCardTilt() {
        if (!this.modalImage) return;
        
        const flipScale = this.isFlipped ? -1 : 1;
        
        this.modalImage.style.transform = `
            perspective(1000px)
            scaleX(${flipScale})
            rotateX(0deg)
            rotateY(0deg)
            translateZ(0px)
            scale(1)
        `;
    }
    
    handleCardFlip() {
        if (!this.modalImage) return;
        
        this.isFlipped = !this.isFlipped;
        
        const flipScale = this.isFlipped ? -1 : 1;
        this.modalImage.style.transform = `
            perspective(1000px)
            scaleX(${flipScale})
            rotateX(0deg)
            rotateY(0deg)
            translateZ(0px)
            scale(1)
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});