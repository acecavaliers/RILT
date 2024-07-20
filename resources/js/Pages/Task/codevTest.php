<?php

declare(strict_types=1);

namespace App;


class UpdatePostHandler
{
    private EventDispatcher $eventDispatcher;
    private PostUpdater $postUpdater;

    public function __construct(EventDispatcher $eventDispatcher, PostUpdater $postUpdater)
    {
        $this->eventDispatcher = $eventDispatcher;
        $this->postUpdater = $postUpdater;
    }

    /**
     * @throws FailedToUpdatePost
     * @throws PostDoesNotExist
     * @throws TitleTooLong
     **/
    public function handle(UpdatePost $command): void
    {
        //implement the handler here, do not change anything outside of this method's body!
        try{
            $post = new BlogPost($command->getPostId(), $command->getUserId(), $command->getTitle(), $command->getContent());
            $this->postUpdater->update($post);
            $event = new PostUpdated($command->getPostId(), $command->getUserId());
            $this.eventDispatcher->dispatch($event);

        }catch (PostBlockedForEditing $e){
            throw new FailedToUpdatePost('Post is blocked for editing',0, $e);
            
        }catch (\Throwable $e){
            if (!($e instanceof PostDoesNotExist) && !($e instanceof TitleTooLong)){
                throw new FailedToUpdatePost('An error occured while updating the post', 0, $e);
            }else{
                throw $e;
            }
        }
    }
}
