import TextCardSender from "./TextCardSender";
import TextCardReceiver from "./TextCardReceiver";
import CreateGroupContainer from "./CreateGroupContainer";
import stylesGroup from "./CreateTicketForm.module.css";
const CreateTicketForm = () => {
  return (
    <div className={stylesGroup.messages}>
      <div className={stylesGroup.messagesAreaWithProfile}>
        <div className={stylesGroup.chatCreateGroup}>
          <TextCardSender
            companyMission="Hi chizzy "
            textCardSenderPosition="absolute"
            textCardSenderTop="0px"
            textCardSenderLeft="0px"
          />
          <TextCardReceiver
            companyMission="Sup!"
            textCardReceiverPosition="absolute"
            textCardReceiverTop="106px"
            textCardReceiverRight="0px"
          />
          <TextCardSender
            companyMission="Any plans for the weekend yet? "
            textCardSenderPosition="absolute"
            textCardSenderTop="212px"
            textCardSenderLeft="0px"
          />
          <TextCardSender
            companyMission="I’d like us to hangout if you’re up for it"
            textCardSenderPosition="absolute"
            textCardSenderTop="318px"
            textCardSenderLeft="0px"
          />
          <TextCardReceiver
            companyMission="By all means, we can"
            textCardReceiverPosition="absolute"
            textCardReceiverTop="460px"
            textCardReceiverRight="0px"
          />
          <TextCardReceiver
            companyMission="Thanks Chizzy"
            textCardReceiverPosition="absolute"
            textCardReceiverTop="566px"
            textCardReceiverRight="0px"
          />
          <div className={stylesGroup.profileOverlay}>
            <CreateGroupContainer
              createGroupContainerPosition="absolute"
              createGroupContainerTop="calc(50% - 169.5px)"
              createGroupContainerLeft="calc(50% - 187px)"
            />
          </div>
        </div>
      </div>
      <div className={stylesGroup.inputSection}>
        <img className={stylesGroup.inputSectionChild} alt="" src="/group-117.svg" />
        <div className={stylesGroup.placeholderTyping}>
          <div className={stylesGroup.sendAMessage}>Send a message...</div>
        </div>
        <img className={stylesGroup.attachIcons} alt="" src="/attachicons.svg" />
      </div>
    </div>
  );
};

export default CreateTicketForm;
