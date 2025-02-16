PRIO:
[] Change multi endpoint to one

BUG:
[V] Incorrect JSON formatting causes the app to crash on request sent
[] Able to send empty request

LOW PRIO BUG:
[] Flash of old data when creating a new request while on another request (cause : no loading state for awaiting the initial save query)

FEAT:
[V] Loading state for explorer initial load
[V] Display loading spinner for save process
[V] Disable save when JSON file is formatted incorrectly
[V] Rename requests
[] Display toast for successful save
[] Loading state for stale request data