import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is an NFT?</AccordionTrigger>
          <AccordionContent>
            NFT stands for Non-Fungible Token. It's a unique digital asset that represents ownership of a specific item or piece of content on the blockchain.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I buy an NFT?</AccordionTrigger>
          <AccordionContent>
            To buy an NFT, you need to have a digital wallet and some cryptocurrency. Browse our marketplace, select an NFT you like, and follow the purchase process.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I sell my own NFTs on this platform?</AccordionTrigger>
          <AccordionContent>
            Yes, you can create and sell your own NFTs on our platform. You'll need to set up a creator account and follow our guidelines for minting and listing NFTs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What fees are associated with buying or selling NFTs?</AccordionTrigger>
          <AccordionContent>
            Our platform charges a small commission on sales. There may also be gas fees associated with blockchain transactions. Check our pricing page for the most up-to-date information.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}