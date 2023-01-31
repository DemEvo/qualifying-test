<template>
  <div class="Home">
    <div id="content" class="clearfix mt-5">
      <div class="innerWrapper">
        <div class="my-4">
          <h2 class="group-name name">Квалификационный тест 1</h2>
        </div>
        <div class="clearheight30"></div>
        <div class="clearheight"></div>
        <h3>Ответы</h3>
        <div class="littledark small answerKey">
            <span class="key-element">
              <img src="@/assets/correctv3.webp" width="15" height="16"
                   alt="Правильный ответ"> Правильный ответ</span>
          <span class="key-element">
            <img src="@/assets/wrongv3.webp" width="15" height="16"
                 alt="Неправильный ответ"> Неправильный ответ </span><span
            class="key-element">
          <img src="../../assets/arrow_bluev3.webp" width="15" height="16"
               alt="Пропущен один из нескольких правильных вариантов ответа"> Пропущен один из нескольких правильных вариантов ответа</span>
          <div class="clearheight5"></div>
        </div>

        <div v-html="textResult1" />
        <div>{{textResult2}}</div>
        <div>{{textResult3}}</div>

        <b-button v-if="!isMore" v-b-modal.modal-scrollable>Старт теста</b-button>

        <div class="result-data" v-if="isMore">

          <div class="qd" v-for="(item,idx) in qd" :key="`qb-${idx}-ancwer`">
            <div class="single_question_box">
              <div class="qbox">
                <div class="qboxprogress"><h2>{{ `Вопрос ${item.num} из 25` }}</h2></div>
                <div class="clear"></div>
              </div>
              <div class="col600">
                <div class="qsholder">
                  <div v-if="!!item.img">
                    <img :src="item.img"
                         class="imgw" alt="" border="0"
                         style="max-width: 500px; display: inline-block;"><br><br>
                  </div>
                  <div v-html="`${idx+1}. ${item.qsholder}`"/>
                </div>
                <div class="dotted_quiz"></div>
                <p v-if="isMore" class="chosen">Правильный ответ: <strong>{{ tuple[item.satick] }}</strong>
                  <br>Вы выбрали: <strong>{{ tuple[item.answer] }}</strong>
                </p>
                <div class="sarow" v-for="(ans,i) in item.saans" :key="`qb-${idx}-answer-${i}`">
                  <div class="satick" v-if="isMore">
                    <img v-if="!!item.answer && item.answer===i+1  && item.satick===item.answer"
                         src="@/assets/correctv3.webp"
                         width="15" height="16" alt="Правильный ответ">
                    <img v-else-if="!!item.answer && item.answer===i+1  && item.satick!==item.answer"
                         src="@/assets/wrongv3.webp"
                         width="15" height="16" alt="Правильный ответ">
                    <img v-if="!!item.answer && item.satick===i+1 && item.satick!==item.answer"
                         src="@/assets/arrow_bluev3.webp"
                         width="15" height="16" alt="Правильный ответ">
                  </div>
                  <div class="satick" v-else>
                    <button class="btn-answer"
                            :class="{'select':item.answer===i+1}"
                            @click="item.answer=i+1">
                      <div class="answer-check">.</div>
                    </button>
                  </div>
                  <div class="saabc">{{ tuple[i+1] }}</div>
                  <div class="saans">{{ ans }}</div>
                </div>
                <div>
                  <span class="headlinetoppoints" v-if="isMore">
                  <strong>Баллы:</strong>
                  <span>
                    {{ `${item.satick === item.answer ? item.points : '0'} /` }}
                  </span>{{ ` ${item.points}` }}</span></div>
                <i class="qc"></i></div>
            </div>
          </div>
        </div>
        <div class="clearheight"></div>
      </div><!-- innerWrapper -->
    </div>

    <b-modal id="modal-scrollable" ref="qbModal" size="xl" scrollable hide-footer>
      <template #modal-header="{ close }">
        <div>{{ dateTextContent }}</div>
      </template>
      <div v-if="!!qd" class="qd position-relative" v-for="(item,idx) in qd" :key="`qbModalCurr-${item.num}-ancwer-${qdCurr}`">
        <div class="single_question_box" :style="qdCurr===idx?`display: block`:`display: none`">
          <div class="qbox">
            <div class="qboxprogress">
              <h2>{{ `Вопрос ${item.num} из 25` }}</h2>
              <div class="img-cont" :class="{'backFl':!!item.state}"
                   @click="item.state = (item.state===1?-1:item.state)"
                   :style="qdCurr===idx?`display: block`:`display: none`">
                <img v-if="item.state!==-1" src="../../assets/time.svg" alt="">
                <img v-else src="../../assets/time_yellow.svg" alt="">
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="col600">
            <div class="qsholder">
              <div v-if="!!item.img">
                <img :src="item.img"
                     class="imgw" alt="" border="0"
                     style="max-width: 500px; display: inline-block;"><br><br>
              </div>
              <div v-html="`${idx+1}. ${item.qsholder}`"/>
            </div>
            <div class="dotted_quiz"></div>

            <div class="sarow" v-for="(ans,i) in item.saans" :key="`qbModalCurr-${item.num}-answer-${i}`">
              <div class="satick" @click="item.answer=i+1, item.state=!item.state?1:item.state">
                <button class="btn-answer"
                        :class="{'select':item.answer===i+1}">
                  <div class="answer-check">.</div>
                </button>
              </div>
              <div class="saabc">{{ tuple[i+1] }}</div>
              <div class="saans">{{ ans }}</div>
            </div>

          </div>
        </div>
        <div class="modal-footer-my my-4" :style="qdCurr===idx?`display: flex`:`display: none`">
          <b-button variant="outline-primary" :disabled="!qdBackLen"
                    @click="backStep">Back</b-button>
          <b-button variant="primary" v-if="qdCurr<24" :disabled="!item.state"
                    @click="nextStep">Next</b-button>
          <b-button variant="primary" v-else :disabled="!item.state"
                    @click="finishe">Finishe</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>


const deadline = new Date(Date.now() + 3600 * 1000);
// id таймера
let timerId = null;

// склонение числительных
function declensionNum(num, words) {
  return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
}

export default {
  name: "Home",
  components: {},
  props: [],
  data() {
    return {
      rand: [],
      dateTextContent: '',
      textResult1: '',
      textResult2: '',
      textResult3: '',
      isMore: false,
      tuple: ['-', 'A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.'],
      qdCurr: 0,
      qd: [
        {
          indx: 0,
          state: 0,
          num: 1,
          img: ``,
          qsholder: `Укажите число, которое завершит последовательность и заменит вопросительный знак?<br><br>48, 24, 72, 36, 108, ?`,
          saans: [
            48,
            54,
            72,
            86
          ],
          points: 4,
          satick: 2,
          answer: null,
          back: false,
        },
        {
          indx: 1,
          state: 0,
          num: 2,
          img: ``,
          qsholder: `Найдите недостающее число в следующей цепочке из четырех возможных вариантов.<br><br>5, 9, 16, 29, 54, 103,____`,
          saans: [
            102,
            294,
            203,
            200
          ],
          points: 1,
          satick: 4,
          answer: null,
          back: false,
        },
        {
          indx: 2,
          state: 0,
          num: 3,
          img: ``,
          qsholder: `Найдите недостающий термин среди четырех альтернатив.<br><br>BHL, DJN, FLP, ____`,
          saans: [
            'HNR',
            'HOS',
            'IOS',
            'INR'
          ],
          points: 4,
          satick: 1,
          answer: null,
          back: false,
        },
        {
          indx: 3,
          state: 0,
          num: 4,
          img: ``,
          qsholder: `Выберите из четырех пар слов ту пару, которая отображает
                  отношение между двумя словами наиболее близко к отношению в паре из написанных заглавными
                  буквами.<br><br>ПТИЦА : КЛЕТКА`,
          saans: [
            'животное : зоопарк',
            'вор : тюрьма',
            'антиквариат : музей',
            'преступление : наказание'
          ],
          points: 4,
          satick: 2,
          answer: null,
          back: false,
        },
        {
          indx: 4,
          state: 0,
          num: 5,
          img: ``,
          qsholder: `Слово MAN закодировано как NBO.<br>
                  <br>Что из перечисленного ниже должно быть кодом<br><br>для слова SKY?`,
          saans: [
            'RBH',
            'SBH',
            'OEF',
            'TLZ'
          ],
          points: 4,
          satick: 4,
          answer: null,
          back: false,
        },
        {
          indx: 5,
          state: 0,
          num: 6,
          img: ``,
          qsholder: `Четыре из пяти слов с переставленными буквами имеют
                  логическую связь. Восстановите порядок букв и найдите лишнее слово.`,
          saans: [
            'нежерин',
            'ренитнет',
            'нетолеф',
            'симопь',
            'герталеф'
          ],
          points: 5,
          satick: 4,
          answer: null,
          back: false,
        },
        {
          indx: 6,
          state: 0,
          num: 7,
          img: ``,
          qsholder: `Мартин идет 7 км на север, затем поворачивает налево и идет
                  3 км. Затем снова поворачивает налево и продолжает идти 7 км вперед. На каком расстоянии в
                  км он находится от начальной точки.`,
          saans: [
            '10 км',
            '6 км',
            '3 км',
            '2 км',
          ],
          points: 4,
          satick: 3,
          answer: null,
          back: false,
        },
        {
          indx: 7,
          state: 0,
          num: 8,
          img: ``,
          qsholder: `В конце деловой конференции 10 присутствующих пожали друг
                  другу руки один раз. Сколько рукопожатий будет всего?`,
          saans: [
            '20',
            '45',
            '55',
            '90',
          ],
          points: 4,
          satick: 2,
          answer: null,
          back: false,
        },
        {
          indx: 8,
          state: 0,
          num: 9,
          img: ``,
          qsholder: `На прошлой неделе на заседании совета директоров
                  присутствовало 28 человек.<br><br>Если соотношение мужчин и женщин было 4:3, сколько женщин было на собрании?`,
          saans: [
            '16',
            '12',
            '7',
            '4',
          ],
          points: 4,
          satick: 2,
          answer: null,
          back: false,
        },
        {
          indx: 9,
          state: 0,
          num: 10,
          img: ``,
          qsholder: `Возраст мальчика на сегодняшний день составляет одну
                  треть от возраста своего отца. Через 12 лет отец будет вдвое старше своего сына. Какой
                  нынешний возраст мальчика?`,
          saans: [
            '10 лет',
            '11 лет',
            '12 лет',
            '13 лет',
          ],
          points: 4,
          satick: 3,
          answer: null,
          back: false,
        },
        {
          indx: 10,
          state: 0,
          num: 11,
          img: `src/assets/10.jpg`,
          qsholder: `Студенты колледжа, которые являются художниками, но не певцами, представлены:`,
          saans: [
            'a',
            'b',
            'f',
            'e',
          ],
          points: 4,
          satick: 2,
          answer: null,
          back: false,
        },
        {
          indx: 11,
          state: 0,
          num: 12,
          img: `src/assets/10.jpg`,
          qsholder: `Xудожники, которые не являются ни студентами колледжа, ни певцами, представлены:`,
          saans: [
            'b',
            'e',
            'c',
            'f',
          ],
          points: 4,
          satick: 4,
          answer: null,
          back: false,
        },
        {
          indx: 12,
          state: 0,
          num: 13,
          img: `src/assets/10.jpg`,
          qsholder: `Студенты колледжа, которые являются певцами, но не художниками, представлены:`,
          saans: [
            'a',
            'b',
            'd',
            'c',
          ],
          points: 4,
          satick: 3,
          answer: null,
          back: false,
        },
        {
          indx: 13,
          state: 0,
          num: 14,
          img: `src/assets/10.jpg`,
          qsholder: `Студенты колледжа, которые являются художниками, а также певцами, представлены:`,
          saans: [
            'c',
            'f',
            'b',
            'a',
          ],
          points: 4,
          satick: 1,
          answer: null,
          back: false,
        },
        {
          indx: 14,
          state: 0,
          num: 15,
          img: ``,
          qsholder: `Даны числа x и y, умножение этих чисел равно 108, а сумма
                  их квадратов равна 225. Разность чисел равна:`,
          saans: [
            '5',
            '4',
            '3',
            'Ничего из перечисленного',
          ],
          points: 4,
          satick: 3,
          answer: null,
          back: false,
        },
        {
          indx: 15,
          state: 0,
          num: 16,
          img: ``,
          qsholder: `Если среднее значение четырех последовательных нечетных
                  чисел равно 16, найдите наименьшее из этих чисел?`,
          saans: [
            '5',
            '7',
            '13',
            '11',
          ],
          points: 4,
          satick: 3,
          answer: null,
          back: false,
        },
        {
          indx: 16,
          state: 0,
          num: 17,
          img: ``,
          qsholder: `Зарплата Мари составляет 1.000€. Она бала уменьшена на
                  10%. На сколько процентов должна подняться её новая зарплата, чтобы она была на уровне
                  изначальной?`,
          saans: [
            '9 %',
            '10 %',
            '11 %',
            '11,11 %',
          ],
          points: 4,
          satick: 4,
          answer: null,
          back: false,
        },
        {
          indx: 17,
          state: 0,
          num: 18,
          img: ``,
          qsholder: `Джек и Роберт сдавали экзамен. Роберт набрал на 9 баллов
                  меньше, чем Джек. Оценка Джека составила 56% от суммы их оценок, сложенных вместе. Вычислите
                  их индивидуальные баллы.`,
          saans: [
            '40 и 33',
            '41 и 35',
            '42 и 35',
            '42 и 33',
          ],
          points: 4,
          satick: 4,
          answer: null,
          back: false,
        },
        {
          indx: 18,
          state: 0,
          num: 19,
          img: `src/assets/euroTech_Study__1_UP.png`,
          qsholder: `Определите закономерность и выберите соответствующий вариант вместо «?».`,
          saans: [
            '14',
            '6',
            '12',
            '9',
          ],
          points: 4,
          satick: 1,
          answer: null,
          back: false,
        },
        {
          indx: 19,
          state: 0,
          num: 20,
          img: `src/assets/euroTech_Study__1_UP_1.png`,
          qsholder: `Определите закономерность и выберите соответствующий вариант вместо «?».`,
          saans: [
            '17',
            '14',
            '16',
            '12',
          ],
          points: 4,
          satick: 4,
          answer: null,
          back: false,
        },
        {
          indx: 20,
          state: 0,
          num: 21,
          img: ``,
          qsholder: `Одновременно бросают 4 игральные кости. Какова
                  вероятность того, что на всех кубиках выпадет одно и то же число.`,
          saans: [
            '1 / 36',
            '1 / 216',
            '1 / 1296',
            '4 / 1296',
          ],
          points: 4,
          satick: 2,
          answer: null,
          back: false,
        },
        {
          indx: 21,
          state: 0,
          num: 22,
          img: ``,
          qsholder: `Какова вероятность того, что число, выбранное из
                  ряда [1,30], является простым числом?`,
          saans: [
            '5 / 9',
            '2 / 7',
            '5 / 30',
            '1 / 3',
          ],
          points: 4,
          satick: 4,
          answer: null,
          back: false,
        },
        {
          indx: 22,
          state: 0,
          num: 23,
          img: ``,
          qsholder: `В сосуде, наполненном апельсиновым соком,
                  содержится 40% апельсиновой мякоти. Часть сока заменяется другим соком, содержащим 19%
                  апельсиновой мякоти, и теперь процент апельсиновой мякоти составляет 26%. Какое количество
                  сока было заменено?`,
          saans: [
            '3 / 2',
            '2 / 3',
            '4 / 5',
            '5 / 4',
          ],
          points: 4,
          satick: 2,
          answer: null,
          back: false,
        },
        {
          indx: 23,
          state: 0,
          num: 24,
          img: ``,
          qsholder: `Роберт и Джек взялись за работу, которую нужно было
                  выполнить за 20 дней. Они начали работать вместе, а через 12 дней к ним присоединился
                  Мартин, и вся работа была завершена за 15 дней. Сколько времени потребовалось бы Мартину для
                  завершения работы, если бы был нанят только он?`,
          saans: [
            '12',
            '15',
            '10',
            '7',
          ],
          points: 4,
          satick: 1,
          answer: null,
          back: false,
        },
        {
          indx: 24,
          state: 0,
          num: 25,
          img: ``,
          qsholder: `Джонни пошел на выставку и увидел там треугольные качели
                  (с прямым углом). Он отметил размеры качелей как 3 м, 4 м и 5 м. Найдите ее площадь?`,
          saans: [
            '7 / 2',
            '5',
            '11',
            '6',
          ],
          points: 4,
          satick: 4,
          answer: null,
          back: false,
        },
      ],
    };
  },
  computed: {
    qdBackLen() {
      return this.qd.filter(a => a.indx<this.qdCurr && a.state===-1).length;
    },
  },
  methods: {
    backStep() {
      let temp = this.qd.filter(a => a.indx<this.qdCurr && a.state===-1);
      let ln = temp.length;
      if(ln>0) {
        this.qdCurr = temp[ln - 1].indx;
      }
    },
    nextStep() {
      let temp = this.qd.filter(a => a.indx>this.qdCurr && a.state!==1);
      let ln = temp.length;
      if(ln>0) {
        this.qdCurr = temp[0].indx;
      }
    },
    finishe() {
      this.countdownTimer(true);
    },
    countdownTimer(stop) {
      const diff = deadline - new Date();
      if (diff <= 0 || !!stop) {
        clearInterval(timerId);
        this.$refs.qbModal.hide();
        this.resultCalc();
        this.isMore = true;
      }
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      this.dateTextContent = minutes + ':' + ('0' + seconds).slice(-2);
    },
    resultCalc() {
      let back = this.qd.filter(a=>a.back).length;
      let valid = this.qd.filter(a=>a.satick===a.answer).length;
      let res = this.qd.reduce((s,a)=>{
        if(a.satick===a.answer){
          return s+a.points;
        }
        return s;
      },0);
      let bas = this.qd.reduce((s,a)=>{
          return s+a.points;
      },0);
      console.log(res,'/',bas,'|',back,'|',valid);
      this.textResult1 = `Результат ${(100*res/bas).toFixed(1)}%`;
      this.textResult2 = `Правильно   ${valid}`;
      this.textResult3 = `Добавлено в закладки ${back}`;
    },
  },
  mounted() {
    console.log(deadline);
    this.countdownTimer();
    timerId = setInterval(this.countdownTimer, 1000);
    for(let i=0; i<25; i++){
      this.rand.push(Math.round(Math.random()*32768) % 4 + 1);
    }
  },
};
</script>

<style lang="scss">
/****  Home  ****/
@import "@/components/styles/bootstrap/bootstrap-mix.scss";

.Home {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;

  .single_question_box {
    margin: 40px 0;
  }
}

#content {
  height: auto;
}

.modal-header {
  background-color: transparent;
}
.modal-body {
}
.img-cont {
  top: 10px;
  right: 0px;
  position: absolute;
  display: inline-block;
  padding: 10px;
  margin: -10px 0;
  cursor: pointer;

  &.backFl {
    cursor: default;
  }
  img {
    width: 25px;
    height: 25px;
  }
}

.modal-footer-my {
  justify-content: space-around;
  align-items: center;

  .btn {
    &.btn-outline-primary, &.btn-primary {
      width: 200px;
    }
  }
}
.clear {
  opacity: 0;
  font-size: 1px;
}
h2 {
  margin: 20px 0 10px;
}

.sarow {
  position: relative;
  margin: 10px 0;
  display: flex;

  & > * {
    margin-right: 10px;
  }

  .satick {
    position: absolute;
    left: -30px;
    min-width: 200px;
    cursor: pointer;
  }

  .btn-answer {
    margin: -15px auto auto -10px;
    padding: 15px;
    width: 45px;
    height: 45px;
    border: none;
    background-color: transparent;

    .answer-check {
      line-height: 15px;
      width: 15px;
      min-height: 15px;
      background-color: white;
      border: 1px solid hsl(208, 7%, 76%);
      color: transparent;
    }

    &.select {
      .answer-check {
        background-color: hsl(208, 7%, 46%);
      }
    }
  }
}

.littledark.small.answerKey, .student_question_filter_links {
  margin-bottom: 20px;
  display: flex;
  flex-flow: column nowrap;
}

.single_question_box {
  border: 1px solid gainsboro;
  padding: 80px 30px 40px 50px;
  border-radius: 5px;
  margin: 0;
  position: relative;

  .qbox {
    position: absolute;
    width: 100%;
    border: 1px solid hsl(0, 0%, 87%);
    background-color: hsl(210, 20%, 98%);
    top: 0;
    left: 0;
    padding: 5px 45px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    opacity: .5;
  }

  .col600 {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    margin-top: 20px;
  }
}

</style>
