//------------------------
// :[ NAME ]:
//     fnUpperAll
//
// :[ CATEGORY ]:
//     Skill
//------------------------
export const fnUpperAll = ( base ) => {
     return base.toUpperCase() ;
} ;

//------------------------
// :[ NAME ]:
//     fnLowerAll
//
// :[ CATEGORY ]:
//     Skill
//------------------------
export const fnLowerAll = ( base ) => {
     return base.toLowerCase() ;
} ;

//------------------------
// :[ NAME ]:
//     fnUpperFirst
//
// :[ CATEGORY ]:
//     Skill
//------------------------
export const fnUpperFirst = ( base ) => {
     const head = base[0];
     const tail = base.slice( 1, base.length ) ;

     return head.toUpperCase() + tail.toLowerCase() ;
} ;


