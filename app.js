new Vue({

    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife ==0;
        }

    },
    methods: {
        startGame() {
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = [];
        },
        attack(special) {
            this.hurt('monsterLife', 5, 10, special, 'Player', 'Monster', 'player');
            if (this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'monster');
            }
        },
        hurt(prop, min, max, special, source, target, cls) {
            const plus = special ? 5 : 0;
            const hurt = this.getRandom(min + plus, max + plus);
            this[prop] = Math.max(this[prop] - hurt, 0);
            this.registerLog(`${source} reached ${target} with ${hurt}!`, cls)
        },
        heal() {
            const healLife = this.getRandom(7, 13);
            if (this.playerLife < 100) {
                this.playerLife = Math.min(this.playerLife + healLife, 100);
                this.registerLog(`Player won life of ${healLife}!`, 'player')
            }
        },
        getRandom(min, max) {
            const value = Math.random() * (max-min) + min;
            return Math.round(value);
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls });
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false;
        }
    }
    
});