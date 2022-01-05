using Project_C_Website.controllers;
using System.Text.Json;
using Xunit;

interface IPage
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Content { get; set; }
}
struct Page
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Content { get; set; }
}
struct PageAPIResponse : IPage
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Content { get; set; }
  public bool Success { get; set; }
  public string Message { get; set; }
}

namespace Project_C_Website.Tests
{
  public class PagesControllerTest
  {
    [Fact]
    public void GetPage_With_Valid_ID_Returns_The_Correct_Page()
    {
      // Arrange
      var controller = new ApiPagesController();

      // Act
      var actionResult = controller.Get(1);

      // Assert
      var response = JsonSerializer.Deserialize<PageAPIResponse>(actionResult);
      Assert.Equal(1, response.Id);
      Assert.NotNull(response.Name);
      Assert.NotNull(response.Content);
      Assert.True(response.Success);
      Assert.NotEqual("Not Found", response.Message);
    }

    [Fact]
    public void GetPage_With_Invalid_ID_Returns_HTTP_Statuscode_404()
    {
      // Arrange
      var controller = new ApiPagesController();

      // Act
      var actionResult = controller.Get(-1);

      // Assert
      var response = JsonSerializer.Deserialize<PageAPIResponse>(actionResult);
      Assert.False(response.Success);
      Assert.Equal("Not Found", response.Message);
      Assert.Equal(default, response.Id);
      Assert.Null(response.Content);
      Assert.Null(response.Name);
    }

    [Fact]
    public void GetPages_Returns_All_Pages()
    {
      // Arrange
      var controller = new ApiPagesController();

      // Act
      var actionResult = controller.Get();

      // Assert
      var response = JsonSerializer.Deserialize<Page[]>(actionResult);
      foreach (var page in response)
      {
        Assert.NotEqual(default, page.Id);
        Assert.NotNull(page.Name);
        //Assert.NotNull(page.Content);
      }
    }

    //[Fact]
    //public void PostPage_Returns_If_Page_Creation_Was_Succesfull()
    //{
    //  // Arrange
    //  var controller = new ApiPagesController();
    //  //controller.Request.Headers.Add("Authorization", "YfuNDagTt7dabIYUXl0gINLT7yyTy6/pJLJ7M/ZQCMQ=");

    //  // Act
    //  string jsonString = JsonSerializer.Serialize(new Page()
    //  {
    //    Name = "Unit_Test_Page"
    //  });
    //  JsonElement newPage = JsonDocument.Parse(jsonString).RootElement;

    //  var actionResult = controller.Post(newPage);

    //  // Assert
    //  var response = JsonSerializer.Deserialize<PageAPIResponse>(actionResult);
    //  Assert.NotEqual(default, response.Id);
    //  Assert.True(response.Success);
      
    //}
  }
}
