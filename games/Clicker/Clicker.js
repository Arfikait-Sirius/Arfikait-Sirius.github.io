import {
    Jessica,
} from "./heroines.js" ;


// Decralations =================================================================================
let score = 0 ;

const DEFAULT_GOAL_SCORE = 10000 ;
const DEFAULT_BASE_SCORE = 1 ;

const DEFAULT_CLICK_STACK = 0 ;

const DEFAULT_STANDARD_BASE = 0 ;
const DEFAULT_MULTIPLIER = 1 ;
const DEFAULT_BOMB_BASE = 0 ;
const DEFAULT_BOMB_INTERVAL = 10 ;
const DEFAULT_AUTO_BASE = 0 ;

const params = {
    goalScore: DEFAULT_GOAL_SCORE,
    baseScore: DEFAULT_BASE_SCORE,

    clickStack: DEFAULT_CLICK_STACK,

    standardBase: DEFAULT_STANDARD_BASE,
    multiplier: DEFAULT_MULTIPLIER,
    bombBase: DEFAULT_BOMB_BASE,
    bombInterval: DEFAULT_BOMB_INTERVAL,
    autoBase: DEFAULT_AUTO_BASE,
} ;
const resetParams = () => {
    params.goalScore = DEFAULT_GOAL_SCORE ;
    params.baseScore = DEFAULT_BASE_SCORE ;

    params.clickStack = DEFAULT_CLICK_STACK ;

    params.standardBase = DEFAULT_STANDARD_BASE ;
    params.multiplier = DEFAULT_MULTIPLIER ;
    params.bombBase = DEFAULT_BOMB_BASE ;
    params.bombInterval = DEFAULT_BOMB_INTERVAL ;
    params.autoBase = DEFAULT_AUTO_BASE ;
} ;

const STATUS = {
    MULTIPLIER: "multiplier",
    BOMB_BASE: "bomb",
    BOMB_INTERVAL: "bombInterval",
    STANDARD_BASE: "standardBase",
    AUTO_BASE: "autoBase",
} ;
const statusMap = new Map() ;
statusMap.set( STATUS.STANDARD_BASE, Jessica.fnGetElementFromId( "label_skill_standard_base" ) ) ;
statusMap.set( STATUS.MULTIPLIER, Jessica.fnGetElementFromId( "label_status_multiplier" ) ) ;
statusMap.set( STATUS.BOMB_BASE, Jessica.fnGetElementFromId( "label_status_bomb_base" ) ) ;
statusMap.set( STATUS.BOMB_INTERVAL, Jessica.fnGetElementFromId( "label_skill_bomb_interval" ) ) ;
statusMap.set( STATUS.AUTO_BASE, Jessica.fnGetElementFromId( "label_skill_auto_base" ) ) ;

let intervalTimer = null ;


// Parts ==========================================================================================
// RESET Functions
const reset = () => {
    score = 0 ;
    updateScore( score ) ;
    resetClear() ;
    resetParams() ;
    stopInterval( intervalTimer ) ;
    resetStatus() ;
} ;

const resetClear = () => {
    Jessica.fnSetText( clearMessageText, "" ) ;
} ;

const resetStatus = () => {
    Jessica.fnSetText( statusMap.get( STATUS.STANDARD_BASE ), DEFAULT_STANDARD_BASE ) ;
    Jessica.fnSetText( statusMap.get( STATUS.MULTIPLIER ), DEFAULT_MULTIPLIER ) ;
    Jessica.fnSetText( statusMap.get( STATUS.BOMB_BASE ), DEFAULT_BOMB_BASE ) ;
    Jessica.fnSetText( statusMap.get( STATUS.BOMB_INTERVAL ), DEFAULT_BOMB_INTERVAL ) ;
    Jessica.fnSetText( statusMap.get( STATUS.AUTO_BASE ), DEFAULT_AUTO_BASE ) ;
} ;

// UPDATE Functions
const goalScoreText = Jessica.fnGetElementFromId( "label_goal_score" ) ;
const updateGoalScore = ( score ) => {
    params.goalScore = score ;
    Jessica.fnSetText( goalScoreText, params.goalScore ) ;
} ;

const scoreText = Jessica.fnGetElementFromId( "label_score" ) ;
const updateScore = ( score ) => {
    Jessica.fnSetText( scoreText, score ) ;
} ;

const updateStatus = ( key, value ) => {
    Jessica.fnSetText( statusMap.get( key ), value ) ;
} ;

// MESSAGE Functions
const clearMessageText = Jessica.fnGetElementFromId( "label_clear_message" ) ;
const isClear = ( score ) => {
    if( score >= params.goalScore ){
        Jessica.fnSetText( clearMessageText, "Congraturations!" ) ;
    }
} ;

// RUNTIME Functions
const getScore = ( currScore ) => {
    let newScore = params.baseScore + params.standardBase ;

    newScore *= params.multiplier ;
    params.clickStack++ ;
    if( params.clickStack == params.bombInterval ){
        newScore += currScore * params.bombBase ;
        params.clickStack = DEFAULT_CLICK_STACK ;
    }

    return newScore ;
} ;

const applyScore = ( score ) => {
    updateScore( score ) ;
    isClear( score ) ;
} ;

const stopInterval = ( intervalTimer ) => {
    if( intervalTimer !== null ){
        clearInterval( intervalTimer ) ;
        intervalTimer = null ;
    }
} ;


// Main ===========================================================================================
updateGoalScore( params.goalScore ) ;

// RESTART
const restartButton = Jessica.fnGetElementFromId( "button_restart" ) ;
Jessica.fnAddClickEvent( restartButton, () => {
    reset() ;
} ) ;

// CHANGE: GOAL
const newGoalScoreTextbox = Jessica.fnGetElementFromId( "textbox_new_goal_score" ) ;
const changeGoalButton = Jessica.fnGetElementFromId( "button_change_goal_score" ) ;
const functionChangeGoalButton = () => {
    reset() ;
    newGoalScoreTextbox.style.display = "inline" ;
    changeGoalButton.innerHTML = "APPLY" ;
    Jessica.fnAddClickEvent( changeGoalButton, () => {
        if( newGoalScoreTextbox.value >= DEFAULT_GOAL_SCORE ){
            updateGoalScore( newGoalScoreTextbox.value ) ;
        }
        newGoalScoreTextbox.style.display = "none" ;
        changeGoalButton.innerHTML = "CHANGE" ;
        Jessica.fnAddClickEvent( changeGoalButton, functionChangeGoalButton ) ;
    } ) ;
} ;
Jessica.fnAddClickEvent( changeGoalButton, functionChangeGoalButton ) ;

// STANDARD-BASE
const skillStandardBase = Jessica.fnGetElementFromId( "button_skill_standard_base" ) ;
Jessica.fnAddClickEvent( skillStandardBase, () => {
    params.standardBase++ ;
    updateStatus( STATUS.STANDARD_BASE, params.standardBase ) ;
} ) ;

// MUTIPLIER
const skillMultiplierX2 = Jessica.fnGetElementFromId( "button_skill_multiplier_x2" ) ;
Jessica.fnAddClickEvent( skillMultiplierX2, () => {
    params.multiplier *= 2 ;
    updateStatus( STATUS.MULTIPLIER, params.multiplier ) ;
} ) ;

// BOMB-BASE
const skillBombBase = Jessica.fnGetElementFromId( "button_skill_bomb_base" ) ;
Jessica.fnAddClickEvent( skillBombBase, () => {
    params.bombBase++ ;
    updateStatus( STATUS.BOMB_BASE, params.bombBase ) ;
} ) ;

// BOMB-INTERVAL
const newbombIntervalTextbox = Jessica.fnGetElementFromId( "textbox_skill_bomb_interval" ) ;
const changebombIntervalButton = Jessica.fnGetElementFromId( "button_skill_change_bomb_interval" ) ;
const functionChangebombIntervalButton = () => {
    newbombIntervalTextbox.style.display = "inline" ;
    changebombIntervalButton.innerHTML = "APPLY" ;
    Jessica.fnAddClickEvent( changebombIntervalButton, () => {
        if( newbombIntervalTextbox.value >= DEFAULT_BOMB_INTERVAL ){
            params.bombInterval = newbombIntervalTextbox.value ;
            updateStatus( STATUS.BOMB_INTERVAL, params.bombInterval ) ;
        }
        newbombIntervalTextbox.style.display = "none" ;
        changebombIntervalButton.innerHTML = "CHANGE" ;
        Jessica.fnAddClickEvent( changebombIntervalButton, functionChangebombIntervalButton ) ;
    } ) ;
} ;
Jessica.fnAddClickEvent( changebombIntervalButton, functionChangebombIntervalButton ) ;

// AUTO-BASE
const skillAutoBase = Jessica.fnGetElementFromId( "button_skill_auto_base" ) ;
Jessica.fnAddClickEvent( skillAutoBase, () => {
    stopInterval( intervalTimer ) ;
    params.autoBase += 10 ;
    updateStatus( STATUS.AUTO_BASE, params.autoBase ) ;
    intervalTimer = setInterval( () => {
        score += params.autoBase ;
        applyScore( score ) ;
    }, 10 * 1000 ) ;
} ) ;


// Play ===========================================================================================
const clickCanvas = Jessica.fnGetElementFromId( "canvas_click" ) ;
Jessica.fnAddClickUpEvent( clickCanvas, () => {
    score += getScore( score, params ) ;
    applyScore( score ) ;
} ) ;
