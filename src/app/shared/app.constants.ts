import { animate, group, state, style, transition, trigger } from "@angular/animations";

export class AppConstants {

  public static userType = [
    {key: 0, name: 'Admin'},
    {key: 1, name: 'Subadmin'},
    {key:2, name: 'User'}
  ]

  public static userStatus = [
    {key: 0, name: 'Inactive'},
    {key: 1, name: 'Active'},
    {key:2, name: 'Deleted'}
  ]
  public static badgeStatus = [
    {key: 0, name: 'Expired'},
    {key: 1, name: 'Active'}
  ]
  public static eventStatus = [
    {key: 1, name: 'Upcoming'},
    {key:2, name: 'Ongoing'},
    {key:3, name: 'Past'}
  ]

  public static ticketStatus = [
    {key: 0, name: 'Deleted'},
    {key: 1, name: 'Active'},
  ]
  public static participantStatus = [
    {key: 0, name: 'Rejected'},
    {key: 1, name: 'Pending'},
    {key: 2, name: 'Approved'}
  ]
  public static badgeTypes = [
    {
      key: 1,
      name: "Year Completion"
    },
    {
      key: 2,
      name: "Event Participation"
    },
    {
      key: 3,
      name: "Award Winning"
    }
  ]

  public static ticketTypeList = [
    {
        'key': 1,
        'value': 'Entry Ticket'
    },
    {
        'key': 2,
        'value': 'VIP Ticket'
    }
  ]
  public static cartStatus = [
    {
        'key': 0,
        'value': 'Cancelled'
    },
    {
        'key': 1,
        'value': 'Cart'
    },
    {
        'key': 2,
        'value': 'Paid'
    },
    {
        'key': 3,
        'value': 'Payment Pending'
    },
    {
        'key': 4,
        'value': 'Delivered'
    }
]
public static orderStatus = [
  {
      'key': 0,
      'value': 'Preorder'
  },
  {
      'key': 1,
      'value': 'Placed'
  },
  {
      'key': 2,
      'value': 'Shipped'
  },
  {
      'key': 3,
      'value': 'Delivered'
  },
  {
      'key': 4,
      'value': 'Returned'
  },
  {
      'key': 5,
      'value': 'Cancelled'
  }
]

  public static onlyNumber = '^[0-9]*$'

    public static fadeAnimation = [
      // the fade-in/fade-out animation.
      trigger('simpleFadeAnimation', [
  
        // the "in" style determines the "resting" state of the element when it is visible.
        state('in', style({ opacity: 1 })),
  
        // fade in when created. this could also be written as transition('void => *')
        transition(':enter', [
          style({ opacity: 0 }),
          animate(3000)
        ]),
  
        // fade out when destroyed. this could also be written as transition('void => *')
        transition(':leave',
          animate(1000, style({ opacity: 0 })))
      ])
    ]
    public static SlideDownAnimation = [
      trigger('slideInOut', [
        state('in', style({ height: '*', opacity: 0 })),
        transition(':leave', [
          style({ height: '*', opacity: 1 }),
  
          group([
            animate(300, style({ height: 0 })),
            animate('200ms ease-in-out', style({ 'opacity': '0' }))
          ])
  
        ]),
        transition(':enter', [
          style({ height: '0', opacity: 0 }),
  
          group([
            animate(300, style({ height: '*' })),
            animate('500ms ease-in-out', style({ 'opacity': '1' }))
          ])
  
        ])
      ])
    ];
  
  
    public static SlideUpAnimation = [
      trigger('slideUpIn', [
        state('in', style({ height: '*', opacity: 0 })),
        transition(':leave', [
          style({ top: '0' }),
  
          group([
            animate(1000, style({ top: '100%' })),
          ])
  
        ]),
        transition(':enter', [
          style({ top: '100%', opacity: 1 }),
  
          group([
            animate(1000, style({ top: '0' })),
            animate('500ms ease-in-out', style({ 'opacity': '1' }))
          ])
  
        ])
      ])
    ];

    public static SlideRightAnimation = [
      trigger('slideRightLeft', [
        state('in', style({ width: '*', opacity: 0 })),
        transition(':leave', [
          style({ width: '*', opacity: 1 }),
  
          group([
            animate(2000, style({ width: 0 })),
            animate('2000ms ease-in-out', style({ 'opacity': '0' }))
          ])
  
        ]),
        transition(':enter', [
          style({ width: '0', opacity: 1 }),
  
          group([
            animate(1000, style({ width: '*' })),
            animate('1000ms ease-in-out', style({ 'opacity': '1' }))
          ])
  
        ])
      ])
    ];
}
