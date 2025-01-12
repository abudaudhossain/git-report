import { userDB } from "../services/db/userDB.js";
import { addRepositories } from "../services/repositories/add.repositories.js";

const webhooksHandler = async (body) => {
  try {
    // console.log(body);
    if (body.action == "created") {
      
      let result = await userDB.update(
        {
          githubId: body.installation.account.id.toString(),
        },
        {
          installationId: body.installation.id,
          clientId: body.installation.client_id,
        }
      );
      if (!result) {
        result = await userDB.create({
          githubId: body.installation.account.id,
          installationId: body.installation.id,
          clientId: body.installation.client_id,
          username: body.installation.account.login,
          avatar: body.installation.account.avatar_url,
        });
      }
      console.log("user : " , result)

      addRepositories(body.repositories, {
        id: body.installation.account.id,
        senderId: body.sender.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default webhooksHandler;
