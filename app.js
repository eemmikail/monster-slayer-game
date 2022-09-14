function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const specialAttackCountDownNumber = 4;
var specialAttackCountDown = specialAttackCountDownNumber;

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      roundNumber: 0,
      isSpecialAttackActive: true,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterHealthValue() {
      return {
        width: String(this.monsterHealth) + "%",
      };
    },
    playerHealthValue() {
      return {
        width: String(this.playerHealth) + "%",
      };
    },
  },
  watch: {
    roundNumber(value) {
      if (this.isSpecialAttackActive === false) {
        specialAttackCountDown--;
      }

      if (specialAttackCountDown === 0) {
        this.isSpecialAttackActive = true;
        specialAttackCountDown = specialAttackCountDownNumber;
      }
      console.log("roundNumber", value, specialAttackCountDown);
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.roundNumber = 0;
      this.logMessages = [];
    },
    attackMonster() {
      const attackPower = getRandomNumber(5, 12);
      this.monsterHealth -= attackPower;

      if (this.monsterHealth < 0) this.monsterHealth = 0;

      this.attackPlayer();

      this.roundNumber++;

      this.addLogMessage("player","attack",attackPower);
    },
    attackPlayer() {
      const attackPower = getRandomNumber(8, 15);
      this.playerHealth -= attackPower;

      if (this.playerHealth < 0) this.playerHealth = 0;

      this.addLogMessage("monster","attack",attackPower);
    },
    specialAttackMonster() {
      this.isSpecialAttackActive = false;

      const attackPower = getRandomNumber(10, 25);
      this.monsterHealth -= attackPower;

      if (this.monsterHealth < 0) this.monsterHealth = 0;

      this.attackPlayer();

      this.roundNumber++;

      this.addLogMessage("player","specialAttack",attackPower);
    },
    healPlayer() {
      this.roundNumber++;
      const healValue = getRandomNumber(8, 20);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();

      this.addLogMessage("player","heal",healValue);
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who,what,value) { 
      //push end of array, unshift beggining of the array.
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  },
});

app.mount("#game");
