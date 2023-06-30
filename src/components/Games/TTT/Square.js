export default function Square({ value, onClick,className,winningLine }) {
    return (
      <section
        className={`ttt-square ${value ? "filled" : ""} ${className} ${winningLine}`}
        onClick={onClick}
      >
        {value === "O" && (
          <svg className="circle-svg" viewBox="0 0 36 36">
            <defs>
              <filter
                id="inner-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feOffset dx="0.7" dy="0.7" />
                <feGaussianBlur stdDeviation="1" result="offset-blur" />
                <feComposite
                  operator="out"
                  in="SourceGraphic"
                  in2="offset-blur"
                  result="inverse"
                />
                <feFlood floodColor="black" floodOpacity="0.6" result="color" />
                <feComposite
                  operator="in"
                  in="color"
                  in2="inverse"
                  result="shadow"
                />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
              </filter>
            </defs>
            <path
              className="circle"
              d="M18 4.5
                a 12.7324 12.7324 0 0 1 0 25.4648
                a 12.7324 12.7324 0 0 1 0 -25.4648"
              filter="url(#inner-shadow)"
            />
          </svg>
        )}
        {value === "X" && (
          <svg className="x-svg" viewBox="0 0 36 36">
            <defs>
              <filter
                id="inner-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feOffset dx="0.7" dy="0.7" />
                <feGaussianBlur stdDeviation="1" result="offset-blur" />
                <feComposite
                  operator="out"
                  in="SourceGraphic"
                  in2="offset-blur"
                  result="inverse"
                />
                <feFlood floodColor="black" floodOpacity="0.6" result="color" />
                <feComposite
                  operator="in"
                  in="color"
                  in2="inverse"
                  result="shadow"
                />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
              </filter>
            </defs>
            <line
              x1="7.2"
              y1="7.2"
              x2="28.8"
              y2="28.8"
              className="x-line1"
              filter="url(#inner-shadow)"
              strokeLinecap="round"
            />
            <line
              x1="28.8"
              y1="7.2"
              x2="7.2"
              y2="28.8"
              className="x-line2"
              filter="url(#inner-shadow)"
              strokeLinecap="round"
            />
          </svg>
        )}
      </section>
    );
  }