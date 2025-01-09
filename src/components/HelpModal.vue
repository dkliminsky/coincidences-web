<template xmlns="http://www.w3.org/1999/html">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Правила</h1>
        </div>

        <div class="modal-body">
          <h2>1. Порядок хода</h2>
          <p>
            Игра состоит из 30 ходов (лет).
            В каждый ход (кроме первого) необходимо:
            <ol>
              <li class="mb-1">
                <button class="game-button-action btn btn-success text-nowrap">
                  <i class="fa-solid fa-circle-down"></i>
                </button>
                - набрать действия (
                законы <i :class="card_categories_config[CARD_CATEGORY_LAW()].info.fontawesome_icon"></i> ,
                проекты <i :class="card_categories_config[CARD_CATEGORY_PROJECT()].info.fontawesome_icon"></i>
                и т.д.)
              </li>
              <li class="mb-1">
                <button class="game-button-action btn btn-info text-nowrap">
                  <i class="fa-solid fa-square-check"></i>
                </button>
                - выполнить любое доступное количество действий
              </li>
              <li class="mb-1">
                <button class="game-button-action btn btn-danger">
                  <i class="fa-solid fa-hourglass-end"></i>
                </button>
                - закончить ход
              </li>
            </ol>
          </p>

          <p>
            Необходимо остаться у власти в течении 30 ходов.
            Потеря власти происходит при достижении максимального значения характеристики
            <HelpDegree
                :name="DEGREE_NAME_CRISIS()"
                :degrees_config="degrees_config"
            />
            или при потере власти по окончанию президентского срока, если не выполнены действия выборов
            <i :class="card_labels_config[LABEL_ELECTIVITY()].info.fontawesome_icon"></i>
            , продлевающих правление.
          </p>

          <h2>2. Характеристики</h2>
          <p>
            Задача в игре — выполнять действия, влияя при этом на значения характеристик. Характеристики можно разделить на 3 типа:
          </p>
          <h4>Характеристики власти</h4>
          <p>
            Значения характеристик являются условием для выполнения действий.
            Чем выше эти значения, тем более сильные действия возможно выполнить.
            Также, высокие значения
            <HelpDegree
                :name="DEGREE_NAME_LAW()"
                :degrees_config="degrees_config"
            />
            дают дополнительные действия для выполнения законов
            <i :class="card_categories_config[CARD_CATEGORY_LAW()].info.fontawesome_icon"></i>&nbsp;.
            А высокие значения
            <HelpDegree
                :name="DEGREE_NAME_MEDIA()"
                :degrees_config="degrees_config"
            />
            дают более высокие значения для действий пропаганды
            <i :class="card_categories_config[CARD_CATEGORY_PROPAGANDA()].info.fontawesome_icon"></i>&nbsp;.
          </p>
          <h4>Характеристики проблем</h4>
          <p>
            Высокие значения этих характеристик приводят к увеличению
            <HelpDegree
                :name="DEGREE_NAME_CRISIS()"
                :degrees_config="degrees_config"
            />
            и к цепной реакции ухудшения проблем и ослабления власти.
          </p>
          <h4>Другие характеристики</h4>
          <ul>
            <li>
              <HelpDegree
                  :name="DEGREE_NAME_EGO()"
                  :degrees_config="degrees_config"
              />
              — при понижении этой характеристики уменьшается количество доступных действий в ход.
            </li>
            <li>
              <HelpDegree
                  :name="DEGREE_NAME_REPRESSION()"
                  :degrees_config="degrees_config"
              />
              — эта характеристика наполняется при выполнении репрессивных
              <i :class="card_categories_config[CARD_CATEGORY_REPRESSION()].info.fontawesome_icon"></i> действий.
              При высоких значениях уменьшается социальная активность, но повышаются экономические проблемы.
            </li>
            <li>
              <HelpDegree
                  :name="DEGREE_NAME_CRISIS()"
                  :degrees_config="degrees_config"
              />
              — эта характеристика увеличивается в момент “переполнения” характеристик проблем.
            </li>
          </ul>

          <h2>3. Тренды</h2>
            <p>
            У характеристик власти и характеристик проблем есть значение тренда — это вероятность,
              с которой изменится характеристика в новом ходу. Пример увеличивающегося тренда:
              <span class="game-badge-trend badge text-bg-warning ms-1"><i class="fa-solid fa-arrow-up"></i>4</span>&nbsp;.

              Есть несколько видов трендов:
            </p>

          <ul>
            <li>
              Исторические тренды — меняются в зависимости от года. Например, недовольство властью растет каждый ход за счет смены поколений.
            </li>

            <li>
              Влияние характеристик — Высокие или низкие значения характеристик влияют на тренд других характеристик.
            </li>

            <li>
              Акторы — появляются в процессе игры и негативно влияют на характеристики. Есть действия, помогающие убрать акторов.
            </li>

            <li>
              Помощники — появляются при выполнении некоторых действий. Позитивно влияют на характеристики.
            </li>
          </ul>

          <h2>4. Действия</h2>
          <p>
            У действий указаны условия выполнения — минимальные значение характеристики власти.
            Эффект от действий может менять характеристики, тренды или особенности выборов.
            Особые действия:
          </p>
          <ul>
            <li>
              Пропаганда <i :class="card_categories_config[CARD_CATEGORY_PROPAGANDA()].info.fontawesome_icon"></i>
              — сила действия зависит от текущего значения характеристики
              <HelpDegree
                  :name="DEGREE_NAME_MEDIA()"
                  :degrees_config="degrees_config"
              />&nbsp;.
            </li>
            <li>
              Реакция <i :class="card_labels_config[LABEL_REACTION()].info.fontawesome_icon"></i> — временное действие, которое пропадет в следующий ход.
            </li>
            <li>
              Цепочки событий <i :class="card_labels_config[LABEL_CHAIN()].info.fontawesome_icon"></i> — выполнение таких действие зависит от выполнения других действий.
            </li>
            <li>
              Выборы <i :class="card_labels_config[LABEL_ELECTIVITY()].info.fontawesome_icon"></i> — см. ниже.
            </li>
          </ul>

          <h2>5. Выборы</h2>
          <p>
            Изначально власть ограничена двумя президентскими сроками по 4 года в каждом сроке.
            Для продолжения правления нужно выполнять действия выборов <i :class="card_labels_config[LABEL_ELECTIVITY()].info.fontawesome_icon"></i> ,
            которые дают возможность продолжать избираться.
            Например, назначить приемника и обнулить ограничение в два срока, обнулить срок за счет правок в конституцию или вообще отказаться от выборов.
          </p>

          <p>
            При появлении оснований для дальнейшего правления, выборы будут выигрываться автоматически.
            При победе на выборах происходит укрепление власти, но если при этом высокий уровень
            <HelpDegree
                :name="DEGREE_NAME_DISTRUST()"
                :degrees_config="degrees_config"
            />&nbsp;, то увеличивается
            <HelpDegree
                :name="DEGREE_NAME_CRISIS()"
                :degrees_config="degrees_config"
            />&nbsp;.
          </p>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ок</button>
        </div>
      </div>

  </div>
</template>

<script>
import DecreeIcon from "@/components/DecreeIcon.vue";
import {
  CARD_CATEGORY_LAW, CARD_CATEGORY_PROJECT,
  CARD_CATEGORY_PROPAGANDA, CARD_CATEGORY_REPRESSION,
  DEGREE_NAME_CRISIS,
  DEGREE_NAME_DISTRUST,
  DEGREE_NAME_EGO,
  DEGREE_NAME_LAW,
  DEGREE_NAME_MEDIA,
  DEGREE_NAME_REPRESSION, LABEL_CHAIN, LABEL_ELECTIVITY, LABEL_REACTION
} from "@/const";
import HelpDegree from "@/components/HelpDegree.vue";

export default {
  name: "HelpModal",
  components: {HelpDegree, DecreeIcon},
  computed: {

  },
  methods: {
    CARD_CATEGORY_PROJECT() {
      return CARD_CATEGORY_PROJECT
    },
    LABEL_ELECTIVITY() {
      return LABEL_ELECTIVITY
    },
    LABEL_CHAIN() {
      return LABEL_CHAIN
    },
    LABEL_REACTION() {
      return LABEL_REACTION
    },
    CARD_CATEGORY_LAW() {
      return CARD_CATEGORY_LAW
    },
    CARD_CATEGORY_REPRESSION() {
      return CARD_CATEGORY_REPRESSION
    },
    CARD_CATEGORY_PROPAGANDA() {
      return CARD_CATEGORY_PROPAGANDA
    },
    DEGREE_NAME_DISTRUST() {
      return DEGREE_NAME_DISTRUST
    },
    DEGREE_NAME_REPRESSION() {
      return DEGREE_NAME_REPRESSION
    },
    DEGREE_NAME_EGO() {
      return DEGREE_NAME_EGO
    },
    DEGREE_NAME_MEDIA() {
      return DEGREE_NAME_MEDIA
    },
    DEGREE_NAME_LAW() {
      return DEGREE_NAME_LAW
    },
    DEGREE_NAME_CRISIS() {
      return DEGREE_NAME_CRISIS
    }

  },
  emits: [],
  props: ['degrees_config', 'card_categories_config', 'card_labels_config', 'trends_config'],
}
</script>

