const request = require("request");
const configs = require("../configs");

// const sendOtp = async (userPhone) => {
//   const code = Math.floor(Math.random() * 99999);
//   code.length < 4 ? Math.floor(Math.random() * 99999) : code;
//   console.log(code);

//   request.post(
//     {
//       url: "http://ippanel.com/api/select",
//       body: {
//         op: "pattern",
//         // user: configs.Otp.user,
//         user: "0935",
//         pass: configs.Otp.pass,
//         fromNum: "3000505",
//         toNum: userPhone,
//         patternCode: configs.Otp.patternCode,
//         inputData: [{ "verification-code": code }],
//       },
//       json: true,
//     },
//     function (error, response, body) {
//       if (Number(body[0]) !== 0 || error) {
//         console.log("OTP Body -->", body);
//         console.log(request);
//         return;
//       }
//     }
//   );
// };

// const sendOtp = async (userPhone) => {
//   try {
//     const code = Math.floor(Math.random() * 99999);
//     // اطمینان از طول مناسب کد
//     const formattedCode = code.toString().padStart(5, "0");
//     console.log(formattedCode);

//     // ارسال درخواست POST بدون استفاده از Promise
//     const response = await new Promise((resolve, reject) => {
//       request.post(
//         {
//           url: "http://ippanel.com/api/select",
//           body: {
//             op: "pattern",
//             user: configs.Otp.user, // یا از متغیر configs.Otp.user استفاده کنید
//             pass: configs.Otp.pass,
//             fromNum: "3000505",
//             toNum: userPhone,
//             patternCode: configs.Otp.patternCode,
//             inputData: [{ "verification-code": formattedCode }],
//           },
//           json: true,
//         },
//         function (error, response, body) {
//           if (error) {
//             reject(new Error("Failed to send OTP: " + error.message));
//           }
//           if (Number(body[0]) !== 0) {
//             reject(new Error(`OTP sending failed. Response: ${body}`));
//           } else {
//             resolve(body); // موفقیت در ارسال OTP
//           }
//         }
//       );
//     });

//     console.log("OTP sent successfully:", response);
//   } catch (error) {
//     throw new Error("Error generating OTP: " + error.message);
//   }
// };

const sendOtp = async (userPhone) => {
  const code = Math.floor(Math.random() * 99999);
  const finalCode =
    code < 10000
      ? Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
      : code;

  return new Promise((resolve) => {
    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: configs.Otp.user,
          pass: configs.Otp.pass,
          fromNum: "3000505",
          toNum: userPhone,
          patternCode: configs.Otp.patternCode,
          inputData: [{ "verification-code": finalCode }],
        },
        json: true,
      },
      function (error, response, body) {
        if (Array.isArray(body) || body.length > 1) {
          console.log("OTP Error Body -->", body);
          resolve({ success: false });
          return;
        }

        resolve({ success: true });
      }
    );
  });
};

module.exports = sendOtp;
