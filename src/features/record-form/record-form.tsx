'use client'

import { DialogHeader, DialogTitle, DialogContent, DialogDescription, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/src/shared/ui/button";
import { registerRecordAction } from "@/src/widgets/leader-board/api/register-record-action";
import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import usePostGameEnd from "../game/api/use-post-game-end";

const RecordForm = ({ startId }: { startId: string }) => {
  const gameId = useParams().gameId;
  const [state, formAction] = useActionState(registerRecordAction, null);
  const { mutate: postEndGame } = usePostGameEnd();

  useEffect(() => {
    postEndGame({
      gameId: Number(gameId),
      startId: startId,
    });
  }, []);

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form action={formAction} className="flex flex-col gap-4" >
            <Input type="text" placeholder="Record your name" name="name" />
            {state?.error && <p className="text-red-500">{state.error}</p>}
            <Input type="hidden" name="startId" value={startId} />
            <Input type="hidden" name="gameId" value={gameId} />
            <Button type="submit">Record</Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RecordForm;