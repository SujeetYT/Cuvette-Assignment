import client from 'twilio';

const sendWhatsAppMessage = async (otp: number, phoneNumber: string) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const contentSid = process.env.TWILIO_WHATSAPP_TEMPLATE_SID;
    const twilioClient = client(accountSid, authToken);

    const response = await twilioClient.messages.create({
      from: `whatsapp:${twilioPhoneNumber}`,
      contentSid: contentSid,
      contentVariables: `{"1":"${otp}"}`,
      to: `whatsapp:${phoneNumber}`
    });

    console.log('WhatsApp message sent:', response);

  } catch (error) {
    console.log('Error sending WhatsApp message:', error);
  }

}

export default sendWhatsAppMessage
