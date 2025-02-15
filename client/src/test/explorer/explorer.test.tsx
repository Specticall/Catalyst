import { fireEvent, waitFor, within } from "@testing-library/react";
import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ExplorerProvider from "@/context/explorer/ExplorerProvider";
import { WorkspaceProvider } from "@/context/workspace/WorkspaceProvider";
import { render } from "../setup";

function renderApp() {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <ExplorerProvider>
        <WorkspaceProvider>
          <App />
        </WorkspaceProvider>
      </ExplorerProvider>
    </QueryClientProvider>
  );
}

// Mock scrollTo function (since they only exist in browsers)
window.HTMLElement.prototype.scrollTo = function () {};

function insertGroup() {
  const screen = renderApp();
  const addButton = screen.getByLabelText("add-collection");
  fireEvent.click(addButton);

  const optionsPopover = screen.getByLabelText("node-options-popover");
  fireEvent.click(optionsPopover);

  const optionsPopoverContent = screen.getByLabelText(
    "node-options-popover-content"
  );
  const newGroupOpt = within(optionsPopoverContent).getByText("Add Group");
  fireEvent.click(newGroupOpt);
  return screen;
}

function insertRequest() {
  const screen = renderApp();
  const addButton = screen.getByLabelText("add-collection");
  fireEvent.click(addButton);

  const optionsPopover = screen.getByLabelText("node-options-popover");
  fireEvent.click(optionsPopover);

  const optionsPopoverContent = screen.getByLabelText(
    "node-options-popover-content"
  );
  const newInsertOpt = within(optionsPopoverContent).getByText("Add Request");
  fireEvent.click(newInsertOpt);
  return screen;
}

describe("Collection insertion", () => {
  it("should insert when pressing the top add button", () => {
    const screen = renderApp();
    const addButton = screen.getByLabelText("add-collection");
    fireEvent.click(addButton);

    const newCollectionExplorerNode = screen.getByLabelText("collection-node");
    expect(newCollectionExplorerNode).toBeInTheDocument();
  });

  it("should display the newly added collection on the workspace", () => {
    const screen = renderApp();
    const addButton = screen.getByLabelText("add-collection");
    fireEvent.click(addButton);

    const collectionWorkspaceContainer = screen.getByLabelText(
      "collection-workspace-container"
    );

    expect(collectionWorkspaceContainer).toBeInTheDocument();
  });

  it("should add the selected collection on the history", () => {
    const screen = renderApp();
    const addButton = screen.getByLabelText("add-collection");
    fireEvent.click(addButton);

    const nodeHistory = screen.getByLabelText("explorer-history-container");
    const newNodeHistory = within(nodeHistory).getByText("New Collection");
    expect(newNodeHistory).toBeInTheDocument();
  });

  it("should show the correct breadcrumb", () => {
    const screen = renderApp();
    const addButton = screen.getByLabelText("add-collection");
    fireEvent.click(addButton);

    const breadcrumbContainer = screen.getByLabelText(
      "workspace-breadcrumbs-container"
    );
    const newNodeBreadcrum =
      within(breadcrumbContainer).getByText("New Collection");

    expect(newNodeBreadcrum).toBeInTheDocument();
  });
});

describe("Group insertion under collection", () => {
  it("should display the new group node on insert", () => {
    const domWithInsertedGroup = insertGroup();
    const sidebar = domWithInsertedGroup.getByLabelText("explorer-sidebar");
    const groupNode = within(sidebar).getByText("New Group");
    expect(groupNode).toBeInTheDocument();
  });

  it("should display the newly added group on the workspace", () => {
    const domWithInsertedGroup = insertGroup();
    const groupWorkspaceContainer = domWithInsertedGroup.getByLabelText(
      "group-workspace-container"
    );

    expect(groupWorkspaceContainer).toBeInTheDocument();
  });

  it("should add the selected collection on the history", () => {
    const domWithInsertedGroup = insertGroup();

    const nodeHistory = domWithInsertedGroup.getByLabelText(
      "explorer-history-container"
    );
    const newNodeHistory = within(nodeHistory).getByText("New Group");

    expect(newNodeHistory).toBeInTheDocument();
  });

  it("should show the correct breadcrumb", () => {
    const domWithInsertedGroup = insertGroup();

    const breadcrumbContainer = domWithInsertedGroup.getByLabelText(
      "workspace-breadcrumbs-container"
    );
    const newNodeBreadcrum = within(breadcrumbContainer).getByText("New Group");

    expect(newNodeBreadcrum).toBeInTheDocument();
  });
});

describe("Request insertion under collection", () => {
  it("should display the new request node on insert", async () => {
    const domWithInsertedRequest = insertRequest();
    await waitFor(() => {
      window.HTMLElement.prototype.scrollTo = function () {};
      const sidebar = domWithInsertedRequest.getByLabelText("explorer-sidebar");
      const requestNode = within(sidebar).getByText("New Request");
      expect(requestNode).toBeInTheDocument();
    });
  });

  it("should display the newly added request on the workspace", async () => {
    const domWithInsertedRequest = insertRequest();
    await waitFor(() => {
      window.HTMLElement.prototype.scrollTo = function () {};
      const requestWorkspaceContainer = domWithInsertedRequest.getByLabelText(
        "request-workspace-container"
      );

      expect(requestWorkspaceContainer).toBeInTheDocument();
    });
  });

  it("should add the selected collection on the history", async () => {
    const domWithInsertedRequest = insertRequest();
    await waitFor(() => {
      window.HTMLElement.prototype.scrollTo = function () {};
      const nodeHistory = domWithInsertedRequest.getByLabelText(
        "explorer-history-container"
      );
      const newNodeHistory = within(nodeHistory).getByText("New Request");
      expect(newNodeHistory).toBeInTheDocument();
    });
  });

  it("should show the correct breadcrumb", async () => {
    const domWithInsertedRequest = insertRequest();

    await waitFor(() => {
      window.HTMLElement.prototype.scrollTo = function () {};
      const breadcrumbContainer = domWithInsertedRequest.getByLabelText(
        "workspace-breadcrumbs-container"
      );
      const newNodeBreadcrum =
        within(breadcrumbContainer).getByText("New Request");

      expect(newNodeBreadcrum).toBeInTheDocument();
    });
  });
});
