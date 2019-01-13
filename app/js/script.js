const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

window.addEventListener('load', () =>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Particle {
    constructor({x, y, speed, radius, color}) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.color = color;
        this.shadowColor = color || this.color;
        this.shadowBlur = 30;
    }
}

class Particles {
    constructor() {
        this.particles = [];
        this.colors = ['#d11b1b', '#13f0d6', '#ffff00', '#003cff'];
    }
    createParticles() {
        let count = this.particles.length;
        let x = Math.random() * canvas.width;
        let speed = 3 + Math.random() * 3;
        let radius = 4 + Math.random() * 6;
        let color = this.colors[Math.floor(Math.random() * this.colors.length)];
        if(count <= 100) {
            this.particles.push(new Particle({
                x: x,
                y: 0,
                speed: speed,
                radius: radius,
                color: color,
            }))
        }
    }
    deleteParticles() {
        this.particles.forEach((Element) => {
            if(Element.y > canvas.height) Element.y = 0;
        });
    }
    updateParticles() {
        this.particles.forEach((Element) => {
            Element.y += Element.speed;
        })
    }
    renderParticles() {
        context.fillStyle = '#2E2E2E';
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.particles.forEach((Element) => {
            context.beginPath();
            context.shadowBlur = Element.shadowBlur;
            context.shadowColor = Element.shadowColor;
            context.arc(Element.x, Element.y, Element.radius, 0, Math.PI * 2);
            context.closePath();
            context.fillStyle = Element.color;
            context.fill();
        });
    }
    loop() {
        window.requestAnimationFrame(this.loop.bind(this));
        this.createParticles();
        this.updateParticles();
        this.deleteParticles();
        this.renderParticles();
    }
}

const part = new Particles();

part.loop();