import { useSignal, useSignalEffect } from "@preact/signals";

import { invoke } from "deco-sites/summer-culture/runtime.ts";
import Icon from "deco-sites/summer-culture/components/ui/Icon.tsx";
import { totalVotes } from "deco-sites/summer-culture/sdk/totalVotes.ts";

export interface Props {
  productId: string;
}

export default function TotalProductVotes({ productId }: Props) {
  const likes = useSignal<number>(0);
  const clicked = useSignal(false);

  useSignalEffect(() => {
    async function addVotes() {
      const data = await invoke["deco-sites/summer-culture"].actions.sendVotes({
        productId: productId,
      });
      if (data.status === "ok") {
        console.log(productId, "productId");
        totalVotes.value++;
      }
    }

    async function verifyVotes() {
      const res = await invoke["deco-sites/summer-culture"].loaders.GetVotes
        .getProductVotes({
          productId: productId,
        });
      likes.value = res?.product ?? 0;
    }
    setInterval(() => {
      verifyVotes();
    }, 30000);

    if (clicked.value) {
      addVotes();
    }

    verifyVotes();
  });

  return (
    <div class="cursor-pointer flex flex-row gap-2 items-center">
      {!clicked.value
        ? <Icon id="MoodSmile" size={24} onClick={() => clicked.value = true} />
        : <Icon id="MoodCheck" size={24} />}
      <span class="font-bold text-sm">{likes.value} Likes</span>
    </div>
  );
}
