import {
    Jessica,
} from "./heroines.js" ;


// Decralations =================================================================================
const DEFAULT_GOAL_SCORE = 10000 ;
const DEFAULT_BASE_SCORE = 1 ;

const DEFAULT_CLICK_STACK = 0 ;

const DEFAULT_MULTIPLIER = 1 ;
const DEFAULT_BOMB_SCORE = 1 ;
const DEFAULT_BOMB_LIMIT = 10 ;
const DEFAULT_BASE_UP = 0 ;

const params = {
    goalScore: DEFAULT_GOAL_SCORE,
    baseScore: DEFAULT_BASE_SCORE,

    clickStack: DEFAULT_CLICK_STACK,

    multiplier: DEFAULT_MULTIPLIER,
    bombScore: DEFAULT_BOMB_SCORE,
    bombLimit: DEFAULT_BOMB_LIMIT,
    baseUp: DEFAULT_BASE_UP,
} ;
const resetParams = () => {
    params.goalScore = DEFAULT_GOAL_SCORE ;
    params.baseScore = DEFAULT_BASE_SCORE ;

    params.clickStack = DEFAULT_CLICK_STACK ;

    params.multiplier = DEFAULT_MULTIPLIER ;
    params.bombScore = DEFAULT_BOMB_SCORE ;
    params.bombLimit = DEFAULT_BOMB_LIMIT ;
    params.baseUp = DEFAULT_BASE_UP ;
} ;

const STATUS = {
    MULTIPLIER: "multiplier",
    BOMB: "bomb",
    BOMB_LIMIT: "bombLimit",
    BASE_UP: "baseUp",
} ;
const statusMap = new Map() ;
statusMap.set( STATUS.MULTIPLIER, Jessica.fnGetElementFromId( "label_status_multiplier" ) ) ;
statusMap.set( STATUS.BOMB, Jessica.fnGetElementFromId( "label_status_bomb" ) ) ;
statusMap.set( STATUS.BOMB_LIMIT, Jessica.fnGetElementFromId( "label_skill_bomb_limit" ) ) ;
statusMap.set( STATUS.BASE_UP, Jessica.fnGetElementFromId( "label_skill_base_up" ) ) ;


// Parts ==========================================================================================
const goalScoreText = Jessica.fnGetElementFromId( "label_goal_score" ) ;
const updateGoalScore = ( score ) => {
    params.goalScore = score ;
    Jessica.fnSetText( goalScoreText, params.goalScore ) ;
} ;

const scoreText = Jessica.fnGetElementFromId( "label_score" ) ;
const updateScore = ( score ) => {
    Jessica.fnSetText( scoreText, score ) ;
} ;

const reset = () => {
    score = 0 ;
    updateScore( score ) ;
    resetClear() ;
    resetParams() ;
    resetStatus() ;
} ;
const resetClear = () => {
    Jessica.fnSetText( clearMessageText, "" ) ;
} ;
const resetStatus = () => {
    Jessica.fnSetText( statusMap.get( STATUS.MULTIPLIER ), DEFAULT_MULTIPLIER ) ;
    Jessica.fnSetText( statusMap.get( STATUS.BOMB ), DEFAULT_BOMB_SCORE ) ;
    Jessica.fnSetText( statusMap.get( STATUS.BOMB_LIMIT ), DEFAULT_BOMB_LIMIT ) ;
} ;

const clearMessageText = Jessica.fnGetElementFromId( "label_clear_message" ) ;
const isClear = ( score ) => {
    if( score >= params.goalScore ){
        Jessica.fnSetText( clearMessageText, "Congraturations!" ) ;
    }
} ;

const updateStatus = ( key, value ) => {
    Jessica.fnSetText( statusMap.get( key ), value ) ;
} ;


// Main ===========================================================================================
Jessica.fnSetText( goalScoreText, params.goalScore ) ;

const newGoalScoreTextbox = Jessica.fnGetElementFromId( "textbox_new_goal_score" ) ;
const changeGoalButton = Jessica.fnGetElementFromId( "button_change_goal_score" ) ;
Jessica.fnAddClickEvent( changeGoalButton, () => {
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
} ) ;
const functionChangeGoalButton = changeGoalButton.onclick ;

const newbombLimitTextbox = Jessica.fnGetElementFromId( "textbox_skill_bomb_limit" ) ;
const changebombLimitButton = Jessica.fnGetElementFromId( "button_skill_change_bomb_limit" ) ;
Jessica.fnAddClickEvent( changebombLimitButton, () => {
    newbombLimitTextbox.style.display = "inline" ;
    changebombLimitButton.innerHTML = "APPLY" ;
    Jessica.fnAddClickEvent( changebombLimitButton, () => {
        if( newbombLimitTextbox.value >= DEFAULT_BOMB_LIMIT ){
            params.bombLimit = newbombLimitTextbox.value ;
            updateStatus( STATUS.BOMB_LIMIT, params.bombLimit ) ;
        }
        newbombLimitTextbox.style.display = "none" ;
        changebombLimitButton.innerHTML = "CHANGE" ;
        Jessica.fnAddClickEvent( changebombLimitButton, functionChangebombLimitButton ) ;
    } ) ;
} ) ;
const functionChangebombLimitButton = changebombLimitButton.onclick ;

const restartButton = Jessica.fnGetElementFromId( "button_restart" ) ;
Jessica.fnAddClickEvent( restartButton, () => {
    reset() ;
} ) ;

const skillX2 = Jessica.fnGetElementFromId( "button_skill_x2" ) ;
Jessica.fnAddClickEvent( skillX2, () => {
    params.multiplier *= 2 ;
    updateStatus( STATUS.MULTIPLIER, params.multiplier ) ;
} ) ;

const skillBomb = Jessica.fnGetElementFromId( "button_skill_bomb" ) ;
Jessica.fnAddClickEvent( skillBomb, () => {
    params.bombScore++ ;
    updateStatus( STATUS.BOMB, params.bombScore ) ;
} ) ;

const skillBaseUp = Jessica.fnGetElementFromId( "button_skill_base_up" ) ;
Jessica.fnAddClickEvent( skillBaseUp, () => {
    params.baseUp++ ;
    updateStatus( STATUS.BASE_UP, params.baseUp ) ;
} ) ;

const getScore = ( currScore ) => {
    let newScore = params.baseScore + params.baseUp ;

    newScore *= params.multiplier ;
    params.clickStack++ ;
    if( params.clickStack == params.bombLimit ){
        newScore += currScore * params.bombScore ;
        params.clickStack = DEFAULT_CLICK_STACK ;
    }

    return newScore ;
} ;


// Play ===========================================================================================
let score = 0 ;
const clickCanvas = Jessica.fnGetElementFromId( "canvas_click" ) ;

Jessica.fnAddClickUpEvent( clickCanvas, () => {
    score += getScore( score, params ) ;
    updateScore( score ) ;
    isClear( score ) ;
} ) ;
