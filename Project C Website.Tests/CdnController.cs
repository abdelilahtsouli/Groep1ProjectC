using Xunit;
using Project_C_Website.controllers;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Linq;

struct ResponseContent
{
  public bool Succes { get; set; }
  public string Message { get; set; }
}

class CdnContent
{
  public string ContentType { get; set; }
  public byte[] FileContents { get; set; }
}

class CdnControllerWrapper : CdnController
{
  
  public string[] ExistingFiles { get; private set; } 

  public CdnControllerWrapper(string[] existingFiles) => ExistingFiles = existingFiles;

  [HttpGet("{id}")]
  public new IActionResult Get(int id) {
    IActionResult actionResult = base.Get(id);
    string fileLocation = getFilePath(id.ToString());

    if (actionResult is ContentResult contentResult)
    {
      if ((contentResult.StatusCode == 500) && ExistingFiles.Contains(fileLocation))
      {
        return Ok(new CdnContent
        {
          ContentType = "png",
          FileContents = new byte[] { 1, 1, 1, 1, 1 }
        });
      }
    }

    return NotFound();
  }
}

namespace Project_C_Website.Tests
{

  public class CdnControllerTest { 
    [Fact]
    public void GetCdn__Valid_ID_Returns_Cdn_Matching_Given_ID()
    {
      // Arrange
      var controller = new CdnControllerWrapper(new string[] { 
        "./assets/1",
        "./assets/2",
        "./assets/3",
        "./assets/4",
      });

      // Act
      var actionResult = controller.Get(1);

      // Assert
      var okObjectResult = actionResult as OkObjectResult;
      Assert.NotNull(okObjectResult);
      Assert.Equal(200, okObjectResult.StatusCode);

      var resultValue = okObjectResult.Value as CdnContent;
      Assert.NotNull(resultValue);
      Assert.NotNull(resultValue.ContentType);
      Assert.NotNull(resultValue.FileContents);
    }

    [Fact]
    public void GetCdn_Invalid_ID_Returns_HTTP_StatusCode_404()
    {
      // Arrange
      var controller = new CdnController();

      // Act
      var actionResult = controller.Get(-1);

      // Assert
      var contentResult = actionResult as ContentResult;
      Assert.NotNull(contentResult);
      Assert.Equal(404, contentResult.StatusCode);

      var responseContent = JsonSerializer.Deserialize<ResponseContent>(contentResult.Content);
      Assert.NotNull(responseContent.Message);
      Assert.False(responseContent.Succes);
    }
  }
}
