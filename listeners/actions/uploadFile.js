const uploadFile = async ({ ack, client, action, body }) => {
    try {
      await ack()
      console.log('upload file')
  
      // let resp = await client.conversations.inviteShared({
      //   channel_name: channel_name,
      //   invite_id: invite_id,
      // })
      // console.log(resp)
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = {uploadFile };
  