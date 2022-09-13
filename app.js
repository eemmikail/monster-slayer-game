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

    },
    monsterHealth(value) {

    }
  },
  methods: {
    attackMonster() {
      const attackPower = getRandomNumber(5, 12);
      this.monsterHealth -= attackPower;

      if (this.monsterHealth < 0) this.monsterHealth = 0;

      this.attackPlayer();

      this.roundNumber++;
    },
    attackPlayer() {
      const attackPower = getRandomNumber(8, 15);
      this.playerHealth -= attackPower;

      if (this.playerHealth < 0) this.playerHealth = 0;
    },
    specialAttackMonster() {
      this.isSpecialAttackActive = false;

      const attackPower = getRandomNumber(10, 25);
      this.monsterHealth -= attackPower;

      if (this.monsterHealth < 0) this.monsterHealth = 0;

      this.attackPlayer();

      this.roundNumber++;
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
    },
  },
});

app.mount("#game");
