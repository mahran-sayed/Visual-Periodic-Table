function Atom({ shells }) {
  const config = {
    shellThickness: "1px",
    electronDiameter: "10px",
    shellDiamter: calculateShellDiameter(shells.length),
    atomStyle: {
      position: "relative",
      width: "310px",
      height: "310px",
    },
    nucleusStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "6%",
      height: "6%",
      backgroundColor: "#fff",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
    },
    shellStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "100%",
      height: "100%",
      transform: "translate(-50%, -50%)",
      borderRadius: "50%",
      border: "1px solid #fff",
    },
    shellsStyle: {
      width: "100%",
      height: "100%",
    },
    electronStyle: {
      position: "absolute",
      borderRadius: "50%",
      backgroundColor: "#F73A50",
    },
  };
  const { sin, cos, PI } = Math;
  /**
   * calculate and return the shell diameter based on the number of shells which is based on each element
   * @param {number} shellLen - number of shells
   * @returns array of diamater of each shell in percentage of container width and height which is rectangle too
   */
  function calculateShellDiameter(shellLen) {
    if (100 / shellLen < 15) {
      return range(15, shellLen, 80 / (shellLen - 1));
    } else {
      return range(95 / shellLen, shellLen, 95 / shellLen);
    }
  }

  /**
   * @param {number} start - start of the array
   * @param {number} size - size of the range array
   * @param {number} step - step between any two elements (step of increment)
   * @returns array containing range of specific start, size and step
   */

  function range(start, size, step) {
    return [...Array(size).keys()].map((val) => start + val * step);
  }

  /**
   * @param {number} angle - the angle of straight line form electron to the orgin of the circle (div of electron class)
   * @returns {number} - required X translation in percentage of the thickness (border-width) x = t/2 cos(angele)
   */

  function getTranslateX(angle) {
    return 0.5 * cos((angle * PI) / 180.0);
  }

  /**
   * @param {number} angle - the angle of straight line form electron to the orgin of the circle (div of electron class)
   * @returns {number} - required Y translation in percentage of the thickness (border-width) x = t/2 cos(angele)
   */

  function getTranslateY(angle) {
    return -0.5 * sin((angle * PI) / 180.0);
  }

  /**
   * Calculate first x component in terms of radius of distace from the origin to the electron laying on the circle
   * circumference which is radius * cos (angle in radians) then shift the axes from the origin of the circle to the
   * top left of the div which is the inital position
   * @param {number} angle - the angle of straight line form electron to the orgin of the circle (div of electron class)
   * @returns {number} - required left translation in percentage of whole width
   */
  function getLeft(angle) {
    return ((1 + cos((angle * PI) / 180.0)) / 2) * 100;
  }

  /**
   * Calculate first y component in terms of radius of distace from the origin to the electron laying on the circle
   * circumference which is radius * sin (angle in radians) then shift the axes from the origin of the circle to the
   * top left of the div which is the inital position
   * @param {number} angle - the angle of straight line form electron to the orgin of the circle (div of electron class)
   * @returns {number} - required top translation in percentage of whole height
   */
  function getTop(angle) {
    return ((1 - sin((angle * PI) / 180.0)) / 2) * 100;
  }

  /**
   *
   * @param {number} numberOfElctrons - number of electrons in the shell
   * @returns {Object} - Object of left, top, translateX, translateY of each electron to move from top left corner to its position
   * on the circle circumference
   */
  function getElectronsPosition(numberOfElctrons) {
    const step = 360 / numberOfElctrons;
    const result = [];
    range(0, numberOfElctrons, step).forEach((angle) => {
      result.push({
        left: getLeft(angle),
        top: getTop(angle),
        translateX: getTranslateX(angle),
        translateY: getTranslateY(angle),
      });
    });
    return result;
  }

  /**
   *
   * @param {number} numberOfElctrons - number of electrons in the shell
   * @returns JSX (Container of electron DIVs of numberOfElctrons parameter )
   */

  function drawShell(numberOfElctrons) {
    const { shellThickness, electronDiameter, shellDiamter } = config;
    const electronsPosition = getElectronsPosition(numberOfElctrons);
    return (
      <>
        {electronsPosition.map((electronPos, index) => {
          const { left, top, translateX, translateY } = electronPos;
          const styleObj = {
            left: left + "%",
            top: top + "%",
            transform: `translate(-50%, -50%) translate(${
              translateX * parseInt(shellThickness)
            }px,${translateY * parseInt(shellThickness)}px)`,
            width: electronDiameter,
            height: electronDiameter,
            ...config.electronStyle,
          };
          return <div key={index} className="electron" style={styleObj}></div>;
        })}
      </>
    );
  }

  return (
    <>
      <div className="atom animate" style={config.atomStyle}>
        <div className="nucleus" style={config.nucleusStyle}></div>
        <div className="shells" style={config.shellsStyle}>
          {shells.map((shell, index) => {
            return (
              <div
                className="shell"
                style={{
                  ...config.shellStyle,
                  width: config.shellDiamter[index] + "%",
                  height: config.shellDiamter[index] + "%",
                }}
                key={index}
              >
                {drawShell(shell)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Atom;
