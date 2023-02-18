
export const BENEFIT_DIRECTION_INCREASE = 'increase';
export const BENEFIT_DIRECTION_DECREASE = 'decrease';


export const DEGREE_VALUE_MAX = 12;

export const DEGREES = {
    'elite': {
        'name': 'elite',
        'title': 'Лояльность элит',
        'icon': 'fa-solid fa-user',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_INCREASE,
    },
    'finance': {
        'name': 'finance',
        'title': 'Финансовые ресурсы',
        'icon': 'fa-solid fa-sack-dollar',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_INCREASE,
    },
    'law': {
        'name': 'law',
        'title': 'Влияние на право',
        'icon': 'fa-solid fa-scale-balanced',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_INCREASE,
    },
    'siloviki': {
        'name': 'siloviki',
        'title': 'Силовики',
        'icon': 'fa-solid fa-person-military-rifle',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_INCREASE,
    },
    'media': {
        'name': 'media',
        'title': 'Контроль СМИ',
        'icon': 'fa-solid fa-tv',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_INCREASE,
    },
    'economy': {
        'name': 'economy',
        'title': 'Спад экономики',
        'icon': 'fa-solid fa-industry',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_DECREASE,
    },
    'corruption': {
        'name': 'corruption',
        'title': 'Коррупция',
        'icon': 'fa-solid fa-hand-holding-dollar',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_DECREASE,
    },
    'social': {
        'name': 'social',
        'title': 'Общественные движения',
        'icon': 'fa-solid fa-people-group',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_DECREASE,
    },
    'distrust': {
        'name': 'distrust',
        'title': 'Недоверие к власти',
        'icon': 'fa-solid fa-face-angry',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_DECREASE,
    },
    'opposition': {
        'name': 'opposition',
        'title': 'Оппозиция',
        'icon': 'fa-solid fa-bullhorn',
        'valueMax': DEGREE_VALUE_MAX,
        'benefitDirection': BENEFIT_DIRECTION_DECREASE,
    },
};