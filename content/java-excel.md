## Java로 Excel 읽기 API
- [JDBC-ODBC Excel driver](http://www.rgagnon.com/javadetails/java-0516.html)

### JSP에서 바로 저장
```jsp
<%@ page contentType="application/vnd.ms-excel; name='My_Excel'" %>
<%
response.setHeader("Content-Disposition", "inline; filename=myfile.xls");
response.setHeader("Content-Description", "JSP Generated Data");
%>
```

### Java Excel API (JXL)
- <http://jexcelapi.sourceforge.net/>
- [jxl.jar를 이용해서 Excel file 생성하기](http://blog.naver.com/heeyato21c/80006878874)
- [Java Excel API Tutorial](http://blog.naver.com/ass1225/80010885847)

### POI
- <http://jakarta.apache.org/poi/index.html>
- Reading Excel Files with Apache POI HSSF
- Writing Excel Files with Apache POI HSSF

Apache POI 프로젝트를 이용해서 엑셀 파일 읽고 쓰기. 이젠 xlsx 파일도 지원한다.

### Xlrd
- <http://blog.naver.com/iiscariot/140002566176>

## Jxl 예제
### 읽기 예제
```java
import jxl.*;
import java.io.*;

public class JxlTest{
  public static void main(String[] args){
    String szFileName="test2.xls";
    Workbook workbook = null;
    Sheet sheet = null;
    Cell cell = null;
    try    {
        //엑셀파일을 인식
        workbook = Workbook.getWorkbook( new File( szFileName));
        //엑셀파일에 포함된 sheet의 배열을 리턴한다.
        //workbook.getSheets();
        if( workbook != null)        {
            //엑셀파일에서 첫번째 Sheet를 인식
            sheet = workbook.getSheet("변환자료");
            if( sheet != null)            {
                //셀인식 Cell a1 = sheet.getCell( 컬럼 Index, 열 Index);
                //셀 내용 String stringa1 = a1.getContents();
                //기록물철의 경우 실제 데이터가 시작되는 Row지정
                int nRowStartIndex = 1;
                //기록물철의 경우 실제 데이터가 끝 Row지정
                int nRowEndIndex   = sheet.getColumn( 1).length - 1;
                //기록물철의 경우 실제 데이터가 시작되는 Column지정
                int nColumnStartIndex = 0;
                //기록물철의 경우 실제 데이터가 끝나는 Column지정
                int nColumnEndIndex = sheet.getRow( 1).length - 1;
                String szValue = "";
                for( int nRow = nRowStartIndex; nRow <= nRowEndIndex; nRow++ )                {
                    for( int nColumn = nColumnStartIndex; nColumn <= nColumnEndIndex ; nColumn++)                    {
                        szValue = sheet.getCell( nColumn, nRow).getContents();
                        System.out.print( szValue);
                        System.out.print( "\t" );
                    }
                    System.out.println();
                }
            }   else  {
                System.out.println( "Sheet is null!!" );
            }
        }  else  {
            System.out.println( "WorkBook is null!!" );
        }
    }  catch( Exception e)  {
        e.printStackTrace();
    }   finally    {
        if( workbook != null)    {
            workbook.close();
        }
    }
  }
}
```

### 쓰기 예제1
```java
/**************************************************/

import java.io.*;
import java.util.*;
import jxl.*;
import jxl.write.*;
import jxl.format.*;

public class ExcelTest2 {

    public ExcelTest2(){
        super();
    }

    public static void main(String[] argv) throws FileNotFoundException, IOException,WriteException{
        WritableWorkbook workbook = Workbook.createWorkbook(new File("c:/myExcelFile.xls")); // 엑셀 파일 저장 루트
        WritableSheet sheet = workbook.createSheet("Sheet1", 0);

        jxl.write.WritableCellFormat format= new WritableCellFormat();
        jxl.write.WritableCellFormat format0= new WritableCellFormat();

        format.setBackground(jxl.format.Colour.GRAY_25 );
        format.setBorder(jxl.format.Border.ALL,jxl.format.BorderLineStyle.THIN );
        format.setAlignment(jxl.format.Alignment.CENTRE);

        format0.setBackground(jxl.format.Colour.WHITE );
        format0.setBorder(jxl.format.Border.ALL,jxl.format.BorderLineStyle.THIN );
        format0.setAlignment(jxl.format.Alignment.CENTRE);
        sheet.setColumnView(0,8);

        jxl.write.Label label =null;
        jxl.write.Blank blank=null;

        label = new jxl.write.Label(0,0,"결재란",format);
        sheet.addCell(label);
        label = new jxl.write.Label(1,0,"테스트",format);
        sheet.addCell(label);
        label = new jxl.write.Label(2,0,"결재일",format);
        sheet.addCell(label);
        label = new jxl.write.Label(3,0,"테스트",format);
        sheet.addCell(label);
        blank = new jxl.write.Blank(4,0,format0);
        sheet.addCell(blank );

        for(int h=1;h<51;h++)
        {
            for(int i=0;i<10;i++)
            {
                label = new jxl.write.Label(i, h, "("+i+","+h+")",format0);
                sheet.addCell(label);
            }
        }
        workbook.write();
        workbook.close();
    }
}

/******************************************************************/
```

### 쓰기 예제2 (Action servlet에서)
```java
/* 접수현황목록 Excel저장 */
public ActionForward excelFileDownload(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response)
    throws Exception {

    // set a form
    BAIAudPlanForm userForm = new BAIAudPlanForm();
    VOUtil.fromRequestToVO(request, userForm);
    userForm.setPage("1");
    userForm.setRow("999");

    try {
        // look-up Components
        BAIAudPlanBiz baiAudPlanBiz = (BAIAudPlanBiz) getServerObject(BAIAudPlanBiz.ROLE);
        HashMap result = baiAudPlanBiz.readListBAIAudPlan(userForm);

        ArrayList vo_list = (ArrayList) result.get("LIST");

        String strFileName = "연간감사계획" + "_" + DateUtil.getDate() + ".xls";
        String strClient = request.getHeader("User-Agent");

        if(strClient.indexOf("MSIE 5.5") != -1 && strClient.indexOf("MSIE 6.0") != -1) {
            response.setHeader("Content-Type", "doesn/matter; charset=euc-kr");
            response.setHeader("Content-Disposition", "filename=" + strFileName + ";");
        }else {
            response.setHeader("Content-Type", "application/octet-stream; charset=euc-kr");
            response.setHeader("Content-Disposition", "attachment;filename=" + strFileName + ";");
        }
        response.setHeader("Pragma",  "no-cache;");
        response.setHeader("Expires", "-1;");

        WritableWorkbook workbook = Workbook.createWorkbook(new File(strFileName));
        WritableSheet sheet = workbook.createSheet("연간감사계획", 0);

        sheet.setColumnView(0, 15);
        sheet.setColumnView(1, 12);
        sheet.setColumnView(2, 25);
        sheet.setColumnView(3, 10);
        sheet.setColumnView(4, 10);
        sheet.setColumnView(5, 10);

        WritableCellFormat border = new WritableCellFormat ();
        border.setBorder(jxl.format.Border.ALL,  jxl.format.BorderLineStyle.THIN);
        border.setWrap(true);
        border.setLocked(true);
        border.setAlignment(jxl.format.Alignment.CENTRE);

        WritableCellFormat borderHeader = new WritableCellFormat ();
        borderHeader.setBorder(jxl.format.Border.ALL,  jxl.format.BorderLineStyle.THIN);
        borderHeader.setWrap(true);
        borderHeader.setLocked(true);
        borderHeader.setAlignment(jxl.format.Alignment.CENTRE );

        sheet.addCell(new Label(0, 0, "국과", borderHeader));
        sheet.addCell(new Label(1, 0, "감사종류", borderHeader));
        sheet.addCell(new Label(2, 0, "감사사항명", borderHeader));
        sheet.addCell(new Label(3, 0, "인원수", borderHeader));
        sheet.addCell(new Label(4, 0, "감사일수", borderHeader));
        sheet.addCell(new Label(5, 0, "실지감사월", borderHeader));

        for(int i=0; i < vo_list.size(); i++) {
            BAIAudPlanVO vo  = (BAIAudPlanVO) vo_list.get(i);
            String aud_type_nm = CodeUtil.findCodeName("AA07", vo.getAud_type_cd());
            String dept_nm = CodeUtil.findCodeName("DEPT", vo.getExec_dept_cd());

            sheet.addCell(new Label(0, i+1, dept_nm, border));
            sheet.addCell(new Label(1, i+1, aud_type_nm, border));
            sheet.addCell(new Label(2, i+1, vo.getAud_item_nm(), border));
            sheet.addCell(new Label(3, i+1, vo.getPson_cnt()  , border));
            sheet.addCell(new Label(4, i+1, vo.getAud_days(), border));
            sheet.addCell(new Label(5, i+1, vo.getField_aud_month()+"월", border));
        }

        workbook.write();
        workbook.close();

        File file = new File( strFileName );
        FileInputStream fin = new FileInputStream(file);
        int ifilesize = (int)file.length();
        byte b[] = new byte[ifilesize];

        ServletOutputStream oout = response.getOutputStream();
        fin.read(b);
        oout.write(b,0,ifilesize);

        oout.close();
        fin.close();
        file.delete();
    } catch(BAIServiceException e) {
        throw new BAIException(e, "close", e.getMessage());
    }
    return null;
}
```

## Related
- [[excel]]
- [[java]]
- [[java-io]]
